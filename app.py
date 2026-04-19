import os, random, uuid, json
from flask import Flask, render_template, request, jsonify
from supabase import create_client, Client
from datetime import datetime, date, timedelta
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "daegil2026")

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
sb: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

MAGIC_TYPES = {
    "수호 마법사": {"e": "🦁", "symbol": "방패", "desc": "든든하고 믿음직한, 곁을 지켜주는", "color": "#c0392b"},
    "지혜 마법사": {"e": "🦉", "symbol": "책", "desc": "깊이 생각하고 신중한", "color": "#2980b9"},
    "빛 마법사": {"e": "🌟", "symbol": "별", "desc": "밝고 따뜻하게 주변을 빛내는", "color": "#f39c12"},
    "치유 마법사": {"e": "🌿", "symbol": "잎사귀", "desc": "공감과 배려로 마음을 치유하는", "color": "#27ae60"},
    "열정 마법사": {"e": "🔥", "symbol": "불꽃", "desc": "끈기있고 뜨거운 에너지의", "color": "#e67e22"},
    "자유 마법사": {"e": "💫", "symbol": "바람", "desc": "창의적이고 자유로운 영혼의", "color": "#8e44ad"},
    "고요 마법사": {"e": "🌙", "symbol": "달", "desc": "조용하지만 깊고 단단한", "color": "#34495e"},
    "창조 마법사": {"e": "🎨", "symbol": "붓", "desc": "섬세하고 독창적인 감각의", "color": "#16a085"},
}

STAGES = [
    {"e": "🌱", "l": "씨앗", "req": 0},
    {"e": "🌿", "l": "새싹", "req": 3},
    {"e": "🍃", "l": "잎사귀", "req": 7},
    {"e": "🌸", "l": "꽃봉오리", "req": 14},
    {"e": "💐", "l": "활짝 핀 꽃", "req": 30},
    {"e": "🌺", "l": "마법의 나무", "req": 60},
]

QUIZ = [
    {"q": "친구가 힘들어 보일 때 나는?", "e": "🤝",
     "opts": [
         {"t": "🤗 말 걸고 위로해줘", "scores": {"수호": 2, "치유": 2, "빛": 1}},
         {"t": "👀 조용히 옆에 있어줘", "scores": {"고요": 2, "지혜": 1, "치유": 1}},
         {"t": "💡 해결책을 찾아줘", "scores": {"지혜": 2, "열정": 1, "수호": 1}},
     ]},
    {"q": "나를 한 마디로 표현하면?", "e": "🪞",
     "opts": [
         {"t": "🌡️ 따뜻한", "scores": {"치유": 2, "빛": 2, "수호": 1}},
         {"t": "🧊 차분한", "scores": {"고요": 2, "지혜": 2, "자유": 1}},
         {"t": "⚡ 에너지 넘치는", "scores": {"열정": 2, "빛": 1, "자유": 1}},
     ]},
    {"q": "기분이 좋아지는 순간은?", "e": "😊",
     "opts": [
         {"t": "🍽️ 맛있는 걸 먹을 때", "scores": {"치유": 2, "빛": 1, "수호": 1}},
         {"t": "🎵 좋아하는 노래를 들을 때", "scores": {"창조": 2, "자유": 2, "고요": 1}},
         {"t": "📱 핸드폰·TV를 볼 때", "scores": {"고요": 2, "자유": 1, "빛": 1}},
     ]},
    {"q": "대길푸른초장에 와서 가장 좋은 것은?", "e": "🌸",
     "opts": [
         {"t": "🎨 다양한 프로그램", "scores": {"열정": 2, "창조": 2, "자유": 1}},
         {"t": "🌸 선생님·친구들", "scores": {"빛": 2, "치유": 2, "수호": 1}},
         {"t": "✨ 실습 학생들", "scores": {"수호": 2, "빛": 1, "치유": 1}},
     ]},
    {"q": "가장 하고 싶은 것은?", "e": "💭",
     "opts": [
         {"t": "✈️ 여행을 떠나고 싶어", "scores": {"자유": 2, "열정": 2, "빛": 1}},
         {"t": "😴 푹 자고 싶어", "scores": {"고요": 2, "치유": 1, "자유": 1}},
         {"t": "💼 일을 하고 싶어", "scores": {"열정": 2, "수호": 2, "지혜": 1}},
     ]},
    {"q": "나에게 더 가까운 것은?", "e": "🌈",
     "opts": [
         {"t": "🌙 밤하늘처럼 고요한", "scores": {"고요": 2, "지혜": 1, "창조": 1}},
         {"t": "☀️ 햇살처럼 따뜻한", "scores": {"빛": 2, "치유": 1, "수호": 1}},
         {"t": "🌊 파도처럼 자유로운", "scores": {"자유": 2, "열정": 1, "창조": 1}},
     ]},
]

SPELLS = [
    "오늘도 충분히 잘하고 있어요 ✨",
    "당신의 감정은 모두 유효해요 🌙",
    "작은 한 걸음이 큰 변화를 만들어요 🌱",
    "당신의 존재 자체가 빛이에요 ⭐",
    "쉬어가도 괜찮아요, 천천히 가도 돼요 🌸",
    "당신은 생각보다 훨씬 강한 사람이에요 💪",
    "오늘의 힘듦은 내일의 강함이 돼요 🔥",
    "지금 이 순간도 소중한 기억이 돼요 💫",
]

CHEERS = ["대단해요! 🌟", "응원해요! 💛", "같이 있을게요! 🌿", "정말 멋져요! ✨", "힘내요! 🔥", "최고예요! 🏆"]

def today_str():
    return date.today().isoformat()

def yest_str():
    return (date.today() - timedelta(days=1)).isoformat()

def calc_stage(visits):
    s = 0
    for i, st in enumerate(STAGES):
        if visits >= st["req"]:
            s = i
    return min(s, len(STAGES) - 1)

def get_type(scores):
    mapping = {
        "수호": "수호 마법사",
        "지혜": "지혜 마법사",
        "빛": "빛 마법사",
        "치유": "치유 마법사",
        "열정": "열정 마법사",
        "자유": "자유 마법사",
        "고요": "고요 마법사",
        "창조": "창조 마법사",
    }
    if not scores:
        return "빛 마법사"
    top = max(scores, key=scores.get)
    return mapping.get(top, "빛 마법사")

def safe_json(data):
    try:
        return data.json()
    except Exception:
        return data

@app.route("/")
def index():
    return render_template("index.html", magic_types=MAGIC_TYPES, stages=STAGES, quiz=QUIZ)

@app.route("/api/user/enter", methods=["POST"])
def user_enter():
    data = request.json or {}
    name = (data.get("name") or "").strip()
    anon = data.get("anon", False)
    if not name:
        if anon:
            name = f"익명 마법사#{random.randint(1000,9999)}"
        else:
            return jsonify({"error": "이름을 입력해주세요"}), 400
    try:
        res = sb.table("users").select("*").eq("name", name).limit(1).execute()
        user = res.data[0] if res.data else None
        today = today_str()

        if user:
            if user.get("last_visit") != today:
                streak = (user.get("visit_streak") or 0) + 1 if user.get("last_visit") == yest_str() else 1
                visits = (user.get("total_visits") or 0) + 1
                stage = calc_stage(visits)
                upd = {"last_visit": today, "visit_streak": streak, "total_visits": visits, "plant_stage": stage}
                try:
                    sb.table("users").update(upd).eq("id", user["id"]).execute()
                    user.update(upd)
                except Exception as e:
                    print("USER UPDATE ERROR:", e)
        else:
            user = {
                "id": str(uuid.uuid4()),
                "name": name,
                "plant_stage": 0,
                "activity_count": 0,
                "visit_streak": 1,
                "total_visits": 1,
                "last_visit": today,
                "magic_type": None,
                "card_color": "#4a2a9a",
                "magic_skill": None,
                "favorite": None,
                "my_spell": None,
                "gender": "미선택",
                "plant_type": None,
            }
            sb.table("users").insert(user).execute()

        return jsonify({"user": user, "stages": STAGES, "magic_types": MAGIC_TYPES})
    except Exception as e:
        print("USER ENTER ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/user/update", methods=["POST"])
def user_update():
    data = request.json or {}
    uid = data.get("id")
    upd = {}
    for k in ["magic_type", "card_color", "magic_skill", "favorite", "my_spell", "gender", "plant_type", "activity_count"]:
        if k in data:
            upd[k] = data[k]
    if not uid or not upd:
        return jsonify({"ok": False}), 400
    try:
        sb.table("users").update(upd).eq("id", uid).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("USER UPDATE ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/quiz/result", methods=["POST"])
def quiz_result():
    scores = (request.json or {}).get("scores", {})
    magic_type = get_type(scores)
    return jsonify({"magic_type": magic_type, "info": MAGIC_TYPES.get(magic_type, {})})

@app.route("/api/emotion", methods=["POST"])
def save_emotion():
    data = request.json or {}
    uid, emo = data.get("user_id"), data.get("emotion")
    try:
        ts = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
        ex = sb.table("emotions").select("id").eq("user_id", uid).gte("created_at", ts).execute()
        if ex.data:
            sb.table("emotions").update({"emotion": emo}).eq("id", ex.data[0]["id"]).execute()
        else:
            sb.table("emotions").insert({
                "id": str(uuid.uuid4()),
                "user_id": uid,
                "emotion": emo,
                "created_at": datetime.now().isoformat(),
            }).execute()
            try:
                _inc_activity(uid)
            except Exception as e:
                print("EMOTION ACTIVITY ERROR:", e)
        return jsonify({"ok": True, "spell": random.choice(SPELLS)})
    except Exception as e:
        print("SAVE EMOTION ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/emotion/month")
def emotion_month():
    uid = request.args.get("user_id")
    ym = request.args.get("ym", today_str()[:7])
    if not uid:
        return jsonify({"calendar": {}})
    try:
        res = sb.table("emotions").select("emotion,created_at").eq("user_id", uid).gte("created_at", ym + "-01").lt("created_at", ym + "-32").execute()
        cal = {}
        for r in res.data or []:
            d = r["created_at"][:10]
            cal[d] = r["emotion"]
        return jsonify({"calendar": cal})
    except Exception as e:
        print("EMOTION MONTH ERROR:", e)
        return jsonify({"calendar": {}})

@app.route("/api/diary", methods=["POST"])
def save_diary():
    data = request.json or {}
    uid, content = data.get("user_id"), (data.get("content") or "").strip()
    if not content:
        return jsonify({"error": "내용을 입력해주세요"}), 400
    try:
        today = today_str()
        ex = sb.table("diaries").select("id").eq("user_id", uid).eq("date", today).execute()
        if ex.data:
            sb.table("diaries").update({"content": content, "updated_at": datetime.now().isoformat()}).eq("id", ex.data[0]["id"]).execute()
        else:
            sb.table("diaries").insert({
                "id": str(uuid.uuid4()),
                "user_id": uid,
                "content": content,
                "date": today,
                "created_at": datetime.now().isoformat(),
            }).execute()
            try:
                _inc_activity(uid)
            except Exception as e:
                print("DIARY ACTIVITY ERROR:", e)
        return jsonify({"ok": True})
    except Exception as e:
        print("SAVE DIARY ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/diary/list")
def diary_list():
    uid = request.args.get("user_id")
    if not uid:
        return jsonify({"diaries": []})
    try:
        res = sb.table("diaries").select("*").eq("user_id", uid).order("date", desc=True).limit(30).execute()
        return jsonify({"diaries": res.data or []})
    except Exception as e:
        print("DIARY LIST ERROR:", e)
        return jsonify({"diaries": []})

@app.route("/api/posts")
def get_posts():
    cat = request.args.get("category", "all")
    try:
        q = sb.table("posts").select("*,users(name,magic_type,card_color)").order("created_at", desc=True).limit(40)
        if cat != "all":
            q = q.eq("category", cat)
        return jsonify({"posts": q.execute().data or []})
    except Exception as e:
        print("GET POSTS ERROR:", e)
        return jsonify({"posts": []})

@app.route("/api/posts", methods=["POST"])
def create_post():
    data = request.json or {}
    uid = data.get("user_id")
    user_name = (data.get("user_name") or "익명").strip()
    content = (data.get("content") or "").strip()
    cat = data.get("category", "일상")
    img_url = data.get("img_url", "")
    yt_url = data.get("yt_url", "")
    if not content:
        return jsonify({"error": "내용을 입력해주세요"}), 400
    try:
        post = {
            "id": str(uuid.uuid4()),
            "user_id": uid,
            "user_name": user_name,
            "content": content,
            "category": cat,
            "likes": 0,
            "cheers": [],
            "img_url": img_url,
            "yt_url": yt_url,
            "created_at": datetime.now().isoformat(),
        }
        sb.table("posts").insert(post).execute()
        try:
            _inc_activity(uid)
        except Exception as e:
            print("POST ACTIVITY ERROR:", e)
        return jsonify({"ok": True, "post": post})
    except Exception as e:
        print("POST ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts/<pid>/cheer", methods=["POST"])
def cheer_post(pid):
    msg = (request.json or {}).get("msg", "응원해요! 💛")
    try:
        res = sb.table("posts").select("likes,cheers").eq("id", pid).execute()
        if not res.data:
            return jsonify({"error": "없음"}), 404
        likes = (res.data[0].get("likes") or 0) + 1
        cheers = res.data[0].get("cheers") or []
        if isinstance(cheers, str):
            cheers = json.loads(cheers)
        cheers.append(msg)
        sb.table("posts").update({"likes": likes, "cheers": cheers}).eq("id", pid).execute()
        return jsonify({"likes": likes, "cheers": cheers})
    except Exception as e:
        print("CHEER ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/gallery")
def gallery():
    mtype = request.args.get("type", "all")
    try:
        q = sb.table("users").select("id,name,magic_type,card_color,plant_stage,activity_count,magic_skill,favorite,my_spell,gender,plant_type").order("total_visits", desc=True).limit(100)
        if mtype != "all":
            q = q.eq("magic_type", mtype)
        res = q.execute()
        return jsonify({"users": res.data or [], "stages": STAGES, "magic_types": MAGIC_TYPES})
    except Exception as e:
        print("GALLERY ERROR:", e)
        return jsonify({"users": [], "stages": STAGES, "magic_types": MAGIC_TYPES})

@app.route("/api/gallery/magic", methods=["POST"])
def send_magic():
    data = request.json or {}
    to_id = data.get("to_id")
    from_name = data.get("from_name", "")
    msg = data.get("msg", "✨")
    try:
        sb.table("magic_sends").insert({
            "id": str(uuid.uuid4()),
            "to_id": to_id,
            "from_name": from_name,
            "msg": msg,
            "created_at": datetime.now().isoformat(),
        }).execute()
        try:
            _inc_activity(to_id, field="magic_count")
        except Exception as e:
            print("MAGIC ACTIVITY ERROR:", e)
        return jsonify({"ok": True})
    except Exception as e:
        print("SEND MAGIC ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/admin/stats")
def admin_stats():
    try:
        users = sb.table("users").select("magic_type").execute().data or []
        dist = {}
        for u in users:
            t = u.get("magic_type") or "미분류"
            dist[t] = dist.get(t, 0) + 1
        total = len(users)
        return jsonify({"total": total, "dist": dist, "magic_types": MAGIC_TYPES, "users": users})
    except Exception as e:
        print("ADMIN STATS ERROR:", e)
        return jsonify({"total": 0, "dist": {}, "magic_types": MAGIC_TYPES, "users": []})

@app.route("/api/admin/stage", methods=["POST"])
def admin_stage():
    stage = (request.json or {}).get("stage", "")
    with open("admin_stage.txt", "w", encoding="utf-8") as f:
        f.write(stage)
    return jsonify({"ok": True, "stage": stage})

@app.route("/api/admin/stage")
def get_stage():
    try:
        with open("admin_stage.txt", encoding="utf-8") as f:
            s = f.read()
    except Exception:
        s = ""
    return jsonify({"stage": s})

def _inc_activity(uid, field="activity_count"):
    try:
        cur = sb.table("users").select(field).eq("id", uid).execute()
        if cur.data:
            val = (cur.data[0].get(field) or 0) + 1
            sb.table("users").update({field: val}).eq("id", uid).execute()
    except Exception as e:
        print("INC_ACTIVITY ERROR:", e)

ADMIN_PW = os.environ.get("ADMIN_PW", "1234")

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    pw = (request.json or {}).get("pw", "")
    if pw == ADMIN_PW:
        return jsonify({"ok": True})
    return jsonify({"error": "비밀번호가 틀렸어요"}), 401

@app.route("/api/admin/users")
def admin_users():
    pw = request.args.get("pw", "")
    if pw != ADMIN_PW:
        return jsonify({"error": "권한 없음"}), 401
    try:
        res = sb.table("users").select("id,name,magic_type,card_color,plant_stage,activity_count,created_at").order("created_at", desc=True).execute()
        return jsonify({"users": res.data or []})
    except Exception as e:
        print("ADMIN USERS ERROR:", e)
        return jsonify({"users": []})

@app.route("/api/admin/users/<uid>", methods=["DELETE"])
def admin_delete_user(uid):
    pw = (request.json or {}).get("pw", "")
    if pw != ADMIN_PW:
        return jsonify({"error": "권한 없음"}), 401
    try:
        try: sb.table("emotions").delete().eq("user_id", uid).execute()
        except Exception as e: print("DEL EMOTIONS ERROR:", e)
        try: sb.table("diaries").delete().eq("user_id", uid).execute()
        except Exception as e: print("DEL DIARIES ERROR:", e)
        try: sb.table("posts").delete().eq("user_id", uid).execute()
        except Exception as e: print("DEL POSTS ERROR:", e)
        try: sb.table("magic_sends").delete().eq("to_id", uid).execute()
        except Exception as e: print("DEL MAGIC SENDS ERROR:", e)
        sb.table("users").delete().eq("id", uid).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("ADMIN DELETE USER ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts/<pid>", methods=["PATCH"])
def edit_post(pid):
    data = request.json or {}
    uid = data.get("user_id")
    content = (data.get("content") or "").strip()
    if not content:
        return jsonify({"error": "내용을 입력해주세요"}), 400
    try:
        res = sb.table("posts").select("user_id").eq("id", pid).limit(1).execute()
        if not res.data or res.data[0]["user_id"] != uid:
            return jsonify({"error": "권한 없음"}), 403
        sb.table("posts").update({"content": content}).eq("id", pid).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("EDIT POST ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts/<pid>", methods=["DELETE"])
def delete_post(pid):
    uid = (request.json or {}).get("user_id")
    try:
        res = sb.table("posts").select("user_id").eq("id", pid).limit(1).execute()
        if not res.data or res.data[0]["user_id"] != uid:
            return jsonify({"error": "권한 없음"}), 403
        sb.table("posts").delete().eq("id", pid).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("DELETE POST ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/diary/<diary_id>", methods=["PATCH"])
def edit_diary(diary_id):
    data = request.json or {}
    uid = data.get("user_id")
    content = (data.get("content") or "").strip()
    if not content:
        return jsonify({"error": "내용을 입력해주세요"}), 400
    try:
        res = sb.table("diaries").select("user_id").eq("id", diary_id).limit(1).execute()
        if not res.data or res.data[0]["user_id"] != uid:
            return jsonify({"error": "권한 없음"}), 403
        sb.table("diaries").update({"content": content}).eq("id", diary_id).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("EDIT DIARY ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/diary/<diary_id>", methods=["DELETE"])
def delete_diary(diary_id):
    uid = (request.json or {}).get("user_id")
    try:
        res = sb.table("diaries").select("user_id").eq("id", diary_id).limit(1).execute()
        if not res.data or res.data[0]["user_id"] != uid:
            return jsonify({"error": "권한 없음"}), 403
        sb.table("diaries").delete().eq("id", diary_id).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("DELETE DIARY ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/admin/posts/<pid>", methods=["DELETE"])
def admin_delete_post(pid):
    pw = (request.json or {}).get("pw", "")
    if pw != ADMIN_PW:
        return jsonify({"error": "권한 없음"}), 401
    try:
        sb.table("posts").delete().eq("id", pid).execute()
        return jsonify({"ok": True})
    except Exception as e:
        print("ADMIN DELETE POST ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=True, port=port)
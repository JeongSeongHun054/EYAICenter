// ============================================================
// LLM PRESETS
// ============================================================
const PRESETS = [
    {
        prompt: '이 기업의 재무 데이터에서 이상 거래 패턴을 탐지하고 감사 위험 등급을 평가해 주세요.',
        response: `[GPT-4o-mini] 감사 AI 분석 리포트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▸ 이상 거래 탐지 결과
  분석 대상 트랜잭션: 47,832건
  이상값 후보 식별: 234건   임계값 Z 2.8 기준
  고위험 항목: 18건   전체의 0.038%

▸ 감사 위험 등급: HIGH
  주요 근거:
  · 월말 집중 거래 패턴 확인   정상 분포 대비 3.2σ 이탈
  · 특수 관계자 거래 비율 12.4%   업종 평균 3.1% 초과
  · 분개 항목 불일치 6건 검출

▸ 권고사항
  1단계: 고위험 18건 전수 확인 요청
  2단계: 특수 관계자 계약서 원본 대조
  3단계: 월말 조정 분개 사유 소명 징구`
    },
    {
        prompt: '법인세 신고 데이터를 분석하여 세액 공제 최적화 방안을 도출해 주세요.',
        response: `[GPT-4o-mini] 세무 AI 최적화 분석
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▸ 적용 가능 공제 항목 탐지
  연구개발 세액공제: 미적용 확인 → 절세 가능액 42,000,000원
  고용증대 세액공제: 신규 채용 7명 → 8,400,000원 공제 가능
  통합투자세액공제: 설비투자 380M → 19,000,000원 공제

▸ 세무 리스크 항목
  · 접대비 한도 초과: 3,200,000원   조정 필요
  · 감가상각 방법 일관성 검토 권고
  · 이월결손금 활용 여부 재검토

▸ 예상 절세 효과: 69,400,000원
▸ 리스크 조정 후 실질 기대 효과: 58,100,000원`
    },
    {
        prompt: '물류 네트워크 데이터를 분석하여 운영 효율화 기회를 식별하고 전략을 제안해 주세요.',
        response: `[GPT-4o-mini] 전략컨설팅 물류 최적화 분석
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▸ 네트워크 현황 진단
  분석 거점 수: 4개 허브
  평균 이송 시간: 5.2시간
  공정 지연 발생률: 1.82%
  가동률 최저 거점: 인천 항공 물류   68.4%

▸ 비효율 구간 식별
  · 서울-부산 직송 경로 비용 과다   우회 최적화 시 18% 절감
  · 인천 허브 유휴 용량 31.6% 미활용
  · 야간 이송 배차 공백 구간 확인

▸ 전략 제언   우선순위 순
  1. 인천 허브 허브앤스포크 재설계 → 연간 240M원 절감 기대
  2. 서울-경기 통합 운영 → 인력 효율화 15%
  3. 실시간 텔레메트리 기반 동적 배차 시스템 도입

▸ 구현 타임라인: 3개월 파일럿 → 6개월 전사 확대`
    }
];

let currentPreset = 0;

function selectPreset(idx, btn) {
    currentPreset = idx;
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('llmInput').value = PRESETS[idx].prompt;
}

// Init first preset
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('llmInput').value = PRESETS[0].prompt;
});

// ============================================================
// LLM SIMULATION — typewriter stream
// ============================================================
async function runLLM() {
    const btn = document.getElementById('llmBtn');
    const output = document.getElementById('llmOutput');
    const status = document.getElementById('llmStatus');
    const inputVal = document.getElementById('llmInput').value.trim();
    if (!inputVal) return;

    btn.disabled = true;
    output.textContent = '';
    status.textContent = 'API 호출 중...';
    status.className = 'llm-status running';

    // Simulate network latency
    await delay(700);

    const responseText = PRESETS[currentPreset].response +
        `\n\n완료 시각: ${new Date().toLocaleTimeString('ko-KR')}`;

    let i = 0;
    function typeNext() {
        if (i < responseText.length) {
            output.textContent += responseText[i++];
            setTimeout(typeNext, 14);
        } else {
            btn.disabled = false;
            status.textContent = '완료';
            status.className = 'llm-status';
        }
    }
    typeNext();
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============================================================
// BAR CHART — animate on scroll into view
// ============================================================
function animateBars() {
    document.querySelectorAll('.bar-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
    });
}

const chartObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateBars, 150);
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });

window.addEventListener('DOMContentLoaded', () => {
    const chart = document.getElementById('featureChart');
    if (chart) chartObserver.observe(chart);
});

// ============================================================
// USE CASE TABS
// ============================================================
function switchTab(tabId, btn) {
    document.querySelectorAll('.uc-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.uc-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('uc-' + tabId).classList.add('active');
}

// ============================================================
// DIJKSTRA SIMULATOR
// ============================================================
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const NODES = {
    W001: { x: 60,  y: 40,  label: '서울 실증 허브',       color: '#38bdf8' },
    W002: { x: 360, y: 40,  label: '경기 스마트 팩토리',   color: '#34d399' },
    W003: { x: 60,  y: 200, label: '인천 항공 물류',        color: '#fb7185' },
    W004: { x: 360, y: 200, label: '부산 항만 센터',        color: '#fbbf24' },
};

const EDGES = [
    ['W001', 'W002', 2],
    ['W001', 'W003', 3],
    ['W002', 'W004', 3],
    ['W003', 'W004', 2],
    ['W001', 'W004', 5],
    ['W002', 'W003', 4],
];

function dijkstra(startId, endId) {
    const dist = {}, prev = {};
    const unvisited = new Set(Object.keys(NODES));
    Object.keys(NODES).forEach(n => { dist[n] = Infinity; prev[n] = null; });
    dist[startId] = 0;

    while (unvisited.size > 0) {
        let curr = null;
        unvisited.forEach(n => { if (curr === null || dist[n] < dist[curr]) curr = n; });
        if (curr === endId || dist[curr] === Infinity) break;
        unvisited.delete(curr);
        EDGES.forEach(([a, b, w]) => {
            if (a === curr || b === curr) {
                const nb = a === curr ? b : a;
                if (unvisited.has(nb) && dist[curr] + w < dist[nb]) {
                    dist[nb] = dist[curr] + w;
                    prev[nb] = curr;
                }
            }
        });
    }
    const path = [];
    let c = endId;
    while (c) { path.unshift(c); c = prev[c]; }
    return path;
}

function buildPath(nodeIds) {
    const pts = [];
    for (let i = 0; i < nodeIds.length - 1; i++) {
        const a = NODES[nodeIds[i]], b = NODES[nodeIds[i + 1]];
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
            pts.push({ x: a.x + (b.x - a.x) * s / steps, y: a.y + (b.y - a.y) * s / steps });
        }
    }
    return pts;
}

let robot = { x: 210, y: 120 };
let pathPts = [], pathIdx = 0, moving = false, activePath = [], currentTarget = 'W001';

function addLog(msg) {
    const log = document.getElementById('telLog');
    log.textContent += `[${new Date().toLocaleTimeString('ko-KR')}] ${msg}\n`;
    log.scrollTop = log.scrollHeight;
}

function triggerRoute() {
    if (moving) return;
    const target = document.getElementById('targetSelect').value;

    let startId = 'W001', minD = Infinity;
    Object.entries(NODES).forEach(([id, n]) => {
        const d = Math.hypot(robot.x - n.x, robot.y - n.y);
        if (d < minD) { minD = d; startId = id; }
    });

    const path = dijkstra(startId, target);
    if (path.length < 2) { addLog(`이미 ${target} 에 위치 중입니다.`); return; }

    pathPts = buildPath(path);
    activePath = path;
    pathIdx = 0;
    moving = true;
    currentTarget = target;

    document.getElementById('targetDest').textContent = target;
    document.getElementById('statusRobot').textContent = '이송 중';
    addLog(`Dijkstra 경로 완료: ${path.join(' → ')}`);
    addLog(`목표 거점 ${target} 으로 이송 시작`);
}

let pulse = 0;

function drawScene() {
    ctx.clearRect(0, 0, W, H);
    pulse = (pulse + 0.05) % (Math.PI * 2);

    // Background
    ctx.fillStyle = '#020207';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 55) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Edges
    ctx.setLineDash([4, 5]);
    ctx.lineWidth = 1;
    EDGES.forEach(([a, b]) => {
        const na = NODES[a], nb = NODES[b];
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
    });
    ctx.setLineDash([]);

    // Active path glow
    if (activePath.length > 1) {
        ctx.strokeStyle = 'rgba(139,92,246,0.55)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        activePath.forEach((id, i) => {
            const n = NODES[id];
            if (i === 0) ctx.moveTo(n.x, n.y); else ctx.lineTo(n.x, n.y);
        });
        ctx.stroke();
    }

    // Nodes
    Object.entries(NODES).forEach(([id, n]) => {
        const isTarget = id === currentTarget;
        // Outer glow ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, isTarget ? 20 + Math.sin(pulse) * 3 : 18, 0, Math.PI * 2);
        ctx.fillStyle = n.color + '18';
        ctx.fill();
        ctx.strokeStyle = n.color + (isTarget ? 'cc' : '55');
        ctx.lineWidth = isTarget ? 2 : 1.5;
        ctx.stroke();

        // Inner fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = n.color + '33';
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // ID text
        ctx.fillStyle = n.color;
        ctx.font = 'bold 8px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(id, n.x, n.y);

        // Label below
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '7.5px Inter, sans-serif';
        ctx.fillText(n.label, n.x, n.y + 24);
    });

    // Robot
    const rg = ctx.createRadialGradient(robot.x, robot.y, 0, robot.x, robot.y, 9);
    rg.addColorStop(0, '#fff');
    rg.addColorStop(1, '#8b5cf6');
    ctx.beginPath();
    ctx.arc(robot.x, robot.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = rg;
    ctx.fill();

    // Pulse ring
    const ringR = 10 + Math.sin(pulse) * 3;
    ctx.beginPath();
    ctx.arc(robot.x, robot.y, ringR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(139,92,246,${0.3 + Math.sin(pulse) * 0.15})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function loop() {
    if (moving && pathIdx < pathPts.length) {
        robot.x = pathPts[pathIdx].x;
        robot.y = pathPts[pathIdx].y;
        pathIdx++;
        document.getElementById('posX').textContent = Math.round(robot.x);
        document.getElementById('posY').textContent = Math.round(robot.y);
        if (pathIdx >= pathPts.length) {
            moving = false;
            document.getElementById('statusRobot').textContent = '도착 완료';
            addLog(`${currentTarget} 도착 완료. 텔레메트리 정상.`);
        }
    }
    drawScene();
    requestAnimationFrame(loop);
}

window.addEventListener('DOMContentLoaded', () => {
    addLog('시뮬레이터 초기화 완료: NVIDIA Isaac Sim 물리 규격 프로토콜 가동');
    loop();
});

// ============================================================
// CODE & CONSOLE SWITCHER LOGIC
// ============================================================
const ML_DATA = {
    kmeans: {
        code: `# K-Means Clustering for User Segmentation
from sklearn.cluster import KMeans
import pandas as pd

# Load processed logs
df = pd.read_sql("SELECT * FROM process_logs", conn)
X = df[['session_count', 'duration_minutes']]

# Run K-Means with optimal k=3
kmeans = KMeans(n_clusters=3, random_state=42)
df['cluster'] = kmeans.fit_predict(X)

print("클러스터별 통계:")
print(df.groupby('cluster').mean())`,
        console: `>>> python train_kmeans.py
K-Means 모델 학습이 정상적으로 종료되었습니다.
Silhouette Coefficient: 0.7423
Cluster 0: 유저 수 1847, 접속 빈도 2.1, 세션 시간 12분, 잔류율 23%
Cluster 1: 유저 수 3291, 접속 빈도 8.4, 세션 시간 47분, 잔류율 61%
Cluster 2: 유저 수 1102, 접속 빈도 21.3, 세션 시간 138분, 잔류율 89%`
    },
    rf: {
        code: `# Random Forest Classifier for Churn Prediction
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Prepare features and label
X = df.drop(columns=['user_id', 'is_churned', 'cluster'])
y = df['is_churned']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf.fit(X_train, y_train)

# Evaluate model
y_pred = rf.predict(X_test)
print(classification_report(y_test, y_pred))`,
        console: `>>> python train_random_forest.py
Random Forest 분류 모델 학습 완료.

Accuracy: 0.8732
Recall: 0.8924
F1-Score: 0.8711

              precision    recall  f1-score   support

       Active       0.89      0.92      0.90      1020
     Churned       0.84      0.79      0.81       228

    accuracy                           0.87      1248
   macro avg       0.86      0.85      0.86      1248
weighted avg       0.88      0.87      0.87      1248`
    }
};

const STATS_DATA = {
    clean: {
        code: `# Pandas Data Cleaning Pipeline
import pandas as pd
import numpy as np

# Load 3-year factory transactions
raw_df = pd.read_sql("SELECT * FROM transactions", conn)

# Fill nulls with forward fill method
clean_df = raw_df.ffill()

# Check dataset info
print(clean_df.info())`,
        console: `>>> python clean_data.py
데이터 정제 파이프라인 가동 완료.
[Pandas Info]
RangeIndex: 99847 entries, 0 to 99846
Data columns (total 5 columns):
 #   Column        Non-Null Count  Dtype  
---  ------        --------------  -----  
 0   timestamp     99847 non-null  object 
 1   facility_id   99847 non-null  object 
 2   process_time  97231 non-null  float64
결측치 보간 완료: ffill 적용 후 99,847개 행 유지`
    },
    smooth: {
        code: `# Exponential Smoothing and Outlier Detection
import pandas as pd
import numpy as np

# Apply exponential smoothing (alpha=0.3)
clean_df['smooth_time'] = clean_df.groupby('facility_id')['process_time'] \\
                          .transform(lambda x: x.ewm(alpha=0.3).mean())

# Z-score outlier detection (threshold=3.0)
mean_val = clean_df['process_time'].mean()
std_val = clean_df['process_time'].std()
clean_df['z_score'] = (clean_df['process_time'] - mean_val) / std_val

outliers = clean_df[clean_df['z_score'].abs() > 3.0]
print(f"이상치 제거 건수: {len(outliers)}건")`,
        console: `>>> python analyze_anomalies.py
지수평활 가중치 연산 완료.
최적 평활계수 alpha = 0.3
평균 공정 이송 임계값 도출:
  · 서울 실증 허브: 342 단위
  · 경기 스마트 팩토리: 285 단위
  · 인천 항공 물류: 198 단위
  · 부산 항만 센터: 421 단위

Z-score 연산 이상치 탐지:
  · 임계값 3.0σ 초과 이상치 총 1847건 발견
  · 탐지 대상 행 전량 이상치 플래그 및 마스킹 완료`
    }
};

function switchMLCode(type, btn) {
    document.querySelectorAll('#section-ml .console-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.getElementById('ml-code-view').textContent = ML_DATA[type].code;
    document.getElementById('ml-console-view').textContent = ML_DATA[type].console;
}

function switchStatsCode(type, btn) {
    document.querySelectorAll('#section-stats .console-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const codeView = document.getElementById('stats-code-view');
    codeView.textContent = STATS_DATA[type].code;
    if (type === 'smooth') {
        codeView.classList.add('code-pane-rose');
        codeView.classList.remove('code-pane-emerald');
    } else {
        codeView.classList.add('code-pane-emerald');
        codeView.classList.remove('code-pane-rose');
    }
    
    document.getElementById('stats-console-view').textContent = STATS_DATA[type].console;
}


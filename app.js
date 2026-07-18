// EY Han Young AI Center Intern Portfolio JS

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // 0. Main Tabs Navigation Logic
    // -------------------------------------------------------------------------
    const mainTabs = document.querySelectorAll(".main-tab");
    const mainTabPanels = document.querySelectorAll(".main-tab-panel");

    mainTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            mainTabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const targetPanelId = "panel-" + tab.getAttribute("data-main-tab");
            mainTabPanels.forEach((panel) => {
                if (panel.id === targetPanelId) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 0.1. Show Proof Global Action Handler
    // -------------------------------------------------------------------------
    window.showProof = function(tabName, optionValue) {
        // Find the main tab button and click it
        const tabBtn = document.querySelector(`.main-tab[data-main-tab="${tabName}"]`);
        if (tabBtn) {
            tabBtn.click();
        }
        
        // If optionValue is provided, change the select value and trigger change event
        if (optionValue) {
            const selectElem = document.getElementById("codeSelect");
            if (selectElem) {
                selectElem.value = optionValue;
                // Dispatch change event to trigger the content update
                selectElem.dispatchEvent(new Event("change"));
            }
        }
    };

    // -------------------------------------------------------------------------
    // 1. Code Viewer Logic
    // -------------------------------------------------------------------------
    const codeSelect = document.getElementById("codeSelect");
    const codeContent = document.getElementById("codeContent");

    const codeSnippets = {
        dijkstra: `// C++ Dijkstra Path Planning for Physical AI AGVs
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Edge {
    int to;
    int weight;
};

void findShortestPath(int start, int end, const vector<vector<Edge>>& graph) {
    int n = graph.size();
    vector<int> dist(n, 1e9);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (const auto& edge : graph[u]) {
            if (dist[u] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[u] + edge.weight;
                pq.push({dist[edge.to], edge.to});
            }
        }
    }
    cout << "Path cost: " << dist[end] << endl;
}`,
        reallocation: `# Python SCM Inventory Reallocation Solver
import numpy as np

def resolve_inventory_imbalance(stockouts, surpluses, cost_matrix):
    transfers = []
    
    # Iterate through surplus and stockout warehouses
    for s_idx, surplus_qty in enumerate(surpluses):
        for d_idx, deficit_qty in enumerate(stockouts):
            if surplus_qty <= 0:
                break
            if deficit_qty <= 0:
                continue
                
            move_qty = min(surplus_qty, deficit_qty)
            cost = cost_matrix[s_idx][d_idx]
            
            transfers.append({
                "from_node": s_idx,
                "to_node": d_idx,
                "quantity": move_qty,
                "unit_cost": cost,
                "total_cost": move_qty * cost
            })
            
            surpluses[s_idx] -= move_qty
            stockouts[d_idx] -= move_qty
            
    return transfers`,
        analytics: `-- SQL SCM Inventory Risk Analytics
SELECT 
    w.name as warehouse_name,
    COUNT(CASE WHEN i.current_stock = 0 THEN 1 END) as stockout_items_count,
    COUNT(CASE WHEN i.current_stock > 0 AND i.current_stock < i.safety_stock THEN 1 END) as safety_breach_items_count,
    COUNT(i.part_id) as total_items_count
FROM warehouses w
JOIN inventory_status i ON w.warehouse_id = i.warehouse_id
GROUP BY w.warehouse_id, w.name
ORDER BY stockout_items_count DESC;`,
        ml_results: `=== K-Means 비지도학습 유저 군집화 결과: K-Means Clustering Profiles ===
[대상 데이터: 2,481명 플레이어 행동 피처]

군집 ID       | VPIP   | PFR    | AF   | 평균 수익 [BB per hand] | 분류 성향 [Segment]
----------------------------------------------------------------------------------
Cluster A    | 35.4%  |  8.2%  | 0.9  | -2.4 BB                 | Loose-Passive 어수룩한 콜러
Cluster B    | 18.6%  | 15.1%  | 2.8  | +4.8 BB                 | Tight-Aggressive 정밀한 공격형
Cluster C    | 28.2%  | 22.4%  | 1.9  | -0.5 BB                 | Loose-Aggressive 고위험 난폭형
Cluster D    | 12.4%  |  5.8%  | 0.7  | +0.2 BB                 | Tight-Passive 신중한 방어형

=== Random Forest 지도학습 쇼다운 진출 예측 결과: RF Classification Report ===
[모델 매개변수: n_estimators=100, max_depth=8 | Test Set Size: 20,000 hands]

* 분류 예측 정확도 [Accuracy]: 84.62%
* 분류 판별력 [ROC-AUC Score]: 0.8924

클래스 구분   | 정밀도 [Precision] | 재현율 [Recall] | F1-Score | 샘플 수 [Support]
----------------------------------------------------------------------------------
중도 포기     | 85.12%             | 91.24%          | 88.07%   | 12,480
쇼다운 진출   | 83.24%             | 74.82%          | 78.80%   |  7,520

* 피처 기여도 분석 [Feature Importance Ranking]:
1. 상대방 프리플랍 레이즈 횟수 [Pre-flop Raise Count] : 32.42%
2. 플레이어 테이블 포지션 [Player Position]         : 24.81%
3. 현재 보유 칩 크기 [Stack Size]                 : 18.53%
4. 과거 승률 트렌드 [Win Rate Trend]               : 14.28%
5. 누적 참여 판수 [Hand Count]                    : 9.96%`,

        data_clean: `=== 데이터 전처리 및 ROP 안전재고 통계 분석 결과: Data Cleaning & ROP Report ===
[원천 데이터: 3개년 99,762건 일일 수요 트랜잭션 로그]

1. 데이터 품질 결측치 정제 내역:
   - 거래일자 date 포맷 통일 및 결측 타임스탬프 124건 보정
   - 음수 수요량 및 아웃라이어 42건 제거
   - 부품 사양 불일치 part_id / code mismatch 18건 교차 정합성 매핑 완료

2. 거점별 차량 부품 ROP 통계 연산 표: Sample Table
   [안전재고 산출 공식: 1.65 * 주간 수요 표준편차 * sqrt[조달 리드타임 5일 / 7]]
   [ROP 산출 공식: 일평균 수요량 * 조달 리드타임 5일 + 안전재고]

거점 ID | 거점명               | 부품 ID | 일평균수요 | 주간표준편차 | 안전재고 | ROP 재발주점
--------------------------------------------------------------------------------------
W001    | 서울 실증 허브       | P0001   | 45.2       | 12.4         | 17.3     | 243
W001    | 서울 실증 허브       | P0002   | 12.8       |  4.2         |  5.9     |  70
W002    | 경기 스마트 팩토리   | P0001   | 28.4       |  8.9         | 12.4     | 154
W002    | 경기 스마트 팩토리   | P0002   |  8.5       |  2.7         |  3.8     |  46
W003    | 인천 항공 물류 센터   | P0001   | 15.2       |  4.8         |  6.7     |  83
W004    | 부산 항만 센터       | P0001   | 34.1       | 10.2         | 14.2     | 185`
    };

    codeSelect.addEventListener("change", (e) => {
        const selected = e.target.value;
        codeContent.textContent = codeSnippets[selected] || "";
    });

    // Initialize with dijkstra
    codeContent.textContent = codeSnippets.dijkstra;

    // -------------------------------------------------------------------------
    // 2. EY Use Cases Tabs Logic
    // -------------------------------------------------------------------------
    const tabs = document.querySelectorAll(".usecase-tab");
    const usecaseTitle = document.getElementById("usecaseTitle");
    const usecaseDetail = document.getElementById("usecaseDetail");
    const usecaseBullets = document.getElementById("usecaseBullets");

    const usecaseData = {
        audit: {
            title: "회계감사 [Audit] AI 활용 및 데이터 검증 지원",
            detail: "전통적인 샘플링 감사 기법을 넘어, 전사적 트랜잭션 데이터를 지능적으로 검증하고 이상 항목을 추출하여 감사의 정밀도를 높입니다.",
            bullets: [
                "<b>이상 거래 탐지:</b> 분산 원장 로그 데이터를 정규화하여 회계 기준과 다른 변칙 거래 패턴을 머신러닝으로 분석",
                "<b>문서 자동 파싱:</b> 계약서 및 영수증 이미지 자료에서 키 가치 정보와 일자, 수량을 추출하여 정합성 검수 자동화",
                "<b>감사 위험 예측:</b> 기업 규모와 과거 재무 상태 데이터를 머신러닝 분류 모델에 대입하여 감사 위험 단계 선제 식별"
            ]
        },
        tax: {
            title: "세무자문 [Tax] 세무 데이터 분석 및 자동화 지원",
            detail: "복잡한 법적 세무 데이터에서 공제 요건을 충족하는 항목을 자동 매칭하고, 세무 리스크를 예측하는 솔루션을 구축합니다.",
            bullets: [
                "<b>공제 항목 최적화:</b> 과거 세무 신고 내역과 지출 항목 데이터를 분류 알고리즘에 적용하여 최적 세액 감면 방안 수립",
                "<b>규제 대응 분석:</b> 세법 개정 텍스트를 학습한 지능형 에이전트를 가동하여 신규 법령 시행에 따른 위험도 자문 지원",
                "<b>수출입 이전가격 검증:</b> 글로벌 거래 원천 데이터에서 이전가격 범위 내 오차가 발생하는 불일치 거래 실시간 포착"
            ]
        },
        strategy: {
            title: "전략 및 재무자문 [Parthenon] AI 비즈니스 분석 지원",
            detail: "시장 분석, 공급망 효율성 개선 및 M&A 실사 과정에서 대규모 외부 데이터를 정리하여 신속한 정량 의사결정을 지원합니다.",
            bullets: [
                "<b>SCM 공급망 비용 최적화:</b> 권역 허브의 수요 변동과 이송 거리를 가중치로 한 재고 배치 모델로 기업 물류비 절감 자문",
                "<b>M&A 시장 분석 리서치:</b> 웹 상의 비정형 뉴스 및 레포트 데이터를 정제하여 타겟 업종의 점유율 추이 및 평판 자동 분석",
                "<b>생성형 AI 컨설팅 Use Case 발굴:</b> 고객사의 고유 인프라에 생성형 AI 기술을 접목할 때의 경제적 타당성 시뮬레이션 모델링"
            ]
        }
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const type = tab.getAttribute("data-tab");
            const data = usecaseData[type];
            if (data) {
                usecaseTitle.innerHTML = data.title;
                usecaseDetail.innerHTML = data.detail;
                usecaseBullets.innerHTML = "";
                data.bullets.forEach((bullet) => {
                    const li = document.createElement("li");
                    li.innerHTML = bullet;
                    usecaseBullets.appendChild(li);
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // 3. Physical AI Robot Logistics Simulator (Canvas)
    // -------------------------------------------------------------------------
    const canvas = document.getElementById("simCanvas");
    const ctx = canvas.getContext("2d");

    // Telemetry log container
    const telLog = document.getElementById("telLog");
    function addLog(msg) {
        const time = new Date().toTimeString().split(" ")[0];
        telLog.textContent += `[${time}] ${msg}\n`;
        telLog.scrollTop = telLog.scrollHeight;
    }

    // Grid coordinates
    const scaleX = 400 / 8;
    const scaleY = 240 / 5;

    const nodes = {
        W001: { x: 1, y: 1, name: "서울 실증 허브 [W001]", color: "#3b82f6", stock: 750 },
        W002: { x: 6, y: 1, name: "경기 스마트 팩토리 [W002]", color: "#10b981", stock: 120 },
        W003: { x: 2, y: 4, name: "인천 항공 물류 센터 [W003]", color: "#f59e0b", stock: 240 },
        W004: { x: 6, y: 4, name: "부산 항만 센터 [W004]", color: "#ec4899", stock: 90 }
    };

    // Robot state
    let robot = {
        x: 1 * scaleX,
        y: 1 * scaleY,
        targetX: 1 * scaleX,
        targetY: 1 * scaleY,
        speed: 3,
        status: "대기 중 [IDLE]",
        targetName: "W001",
        path: []
    };

    const targetSelect = document.getElementById("targetSelect");
    const triggerBtn = document.getElementById("triggerBtn");

    triggerBtn.addEventListener("click", () => {
        const destKey = targetSelect.value;
        const dest = nodes[destKey];
        if (dest) {
            robot.targetX = dest.x * scaleX;
            robot.targetY = dest.y * scaleY;
            robot.targetName = destKey;
            robot.status = "이동 중 [MOVING]";
            robot.path = [[robot.x, robot.y], [dest.x * scaleX, dest.y * scaleY]];
            
            addLog(`이송 명령 수신: 대상 ${dest.name} 로봇 이동을 시작합니다.`);
            document.getElementById("statusRobot").textContent = robot.status;
            document.getElementById("targetDest").textContent = dest.name;
        }
    });

    // Draw background grid
    function drawGrid() {
        ctx.strokeStyle = "#1f2937";
        ctx.lineWidth = 1;
        for (let x = 0; x < 400; x += scaleX) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 240);
            ctx.stroke();
        }
        for (let y = 0; y < 240; y += scaleY) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(400, y);
            ctx.stroke();
        }
    }

    // Draw nodes
    function drawNodes() {
        for (const [key, node] of Object.entries(nodes)) {
            const px = node.x * scaleX;
            const py = node.y * scaleY;

            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(px, py, 14, 0, Math.PI * 2);
            ctx.fill();

            // Border ring
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label text
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 9px Arial";
            ctx.textAlign = "center";
            ctx.fillText(key, px, py + 4);

            // Detailed text
            ctx.fillStyle = "#9ca3af";
            ctx.font = "8px Arial";
            ctx.fillText(`재고: ${node.stock}`, px, py + 26);
        }
    }

    // Draw paths
    function drawPaths() {
        ctx.strokeStyle = "#374151";
        ctx.lineWidth = 4;
        ctx.beginPath();
        // Path from W001 to W002
        ctx.moveTo(1 * scaleX, 1 * scaleY);
        ctx.lineTo(6 * scaleX, 1 * scaleY);
        // Path from W001 to W003
        ctx.moveTo(1 * scaleX, 1 * scaleY);
        ctx.lineTo(2 * scaleX, 4 * scaleY);
        // Path from W003 to W004
        ctx.moveTo(2 * scaleX, 4 * scaleY);
        ctx.lineTo(6 * scaleX, 4 * scaleY);
        // Path from W002 to W004
        ctx.moveTo(6 * scaleX, 1 * scaleY);
        ctx.lineTo(6 * scaleX, 4 * scaleY);
        ctx.stroke();
    }

    // Draw robot
    function drawRobot() {
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(robot.x, robot.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    // Update simulation frame
    function updateRobot() {
        if (robot.status === "이동 중 [MOVING]") {
            const dx = robot.targetX - robot.x;
            const dy = robot.targetY - robot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < robot.speed) {
                robot.x = robot.targetX;
                robot.y = robot.targetY;
                robot.status = "대기 중 [IDLE]";
                
                const dest = nodes[robot.targetName];
                addLog(`로봇 도착 완료: 대상 거점 ${dest.name} 하역 공정을 개시합니다.`);
                document.getElementById("statusRobot").textContent = robot.status;
                document.getElementById("posX").textContent = Math.round(robot.x);
                document.getElementById("posY").textContent = Math.round(robot.y);
            } else {
                robot.x += (dx / distance) * robot.speed;
                robot.y += (dy / distance) * robot.speed;
                
                document.getElementById("posX").textContent = Math.round(robot.x);
                document.getElementById("posY").textContent = Math.round(robot.y);
            }
        }
    }

    // Main render loop
    function loop() {
        ctx.clearRect(0, 0, 400, 240);
        drawGrid();
        drawPaths();
        drawNodes();
        updateRobot();
        drawRobot();
        requestAnimationFrame(loop);
    }

    // -------------------------------------------------------------------------
    // 4. LLM API Simulation Playground Logic
    // -------------------------------------------------------------------------
    const llmBtn = document.getElementById("llmBtn");
    const llmInput = document.getElementById("llmInput");
    const llmOutput = document.getElementById("llmOutput");

    llmBtn.addEventListener("click", () => {
        const query = llmInput.value.trim();
        if (!query) {
            alert("프롬프트를 입력해 주세요!");
            return;
        }

        llmOutput.style.display = "block";
        llmOutput.textContent = "OpenAI API 호출 중... [Requesting gpt-4o-mini]\n";

        // Simulated API response delay
        setTimeout(() => {
            let response = "";
            const activeTab = document.querySelector(".usecase-tab.active").getAttribute("data-tab");

            if (activeTab === "audit") {
                response = `[API Response - gpt-4o-mini]\n` +
                           `입력 프롬프트: "${query}"\n` +
                           `감사 기준 정합성 분석 결과: 해당 항목에서 위험 징후 1건이 식별되었습니다.\n` +
                           `• 거래 코드: TX-9082 [비정상 거액 자금 출금]\n` +
                           `• 조치 추천: 원장 계정 일치 여부 재검토 및 증빙 자료 감사 증적 요청`;
            } else if (activeTab === "tax") {
                response = `[API Response - gpt-4o-mini]\n` +
                           `입력 프롬프트: "${query}"\n` +
                           `세무 공제 요건 분석 결과: 연구개발비 세액공제 적합도가 분석되었습니다.\n` +
                           `• 공제 항목: 인력개발비 조세특례제한법 제10조\n` +
                           `• 조치 추천: 연구노트 보관 상태 검증 및 인턴 인건비 증빙 확보`;
            } else {
                response = `[API Response - gpt-4o-mini]\n` +
                           `입력 프롬프트: "${query}"\n` +
                           `SCM 물류망 최적화 분석 결과: 이송 경로 단축 방안이 연산되었습니다.\n` +
                           `• 최적 경로: W001 서울 실증 허브에서 W002 경기 스마트 팩토리로의 이송 단축\n` +
                           `• 조치 추천: 다익스트라 이송 가중치 15% 감축을 위한 거점간 사전 재고 재배치`;
            }
            llmOutput.textContent = response;
        }, 1200);
    });

    // Run simulator loop
    loop();
    addLog("시뮬레이터 초기화 완료: NVIDIA Isaac Sim 물리 규격 프로토콜 가동");
});

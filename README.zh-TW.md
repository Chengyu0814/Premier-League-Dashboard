# Premier-League-Dashboard

[English](README.md) | **繁體中文**

2026/27 賽季英超儀表板。目前先以 **Manchester United** 為主，顯示最近 5 場已完賽和接下來 3 場比賽。

這是一個學習用的專案：後端用 Python 從英超官網的 Pulse API 抓資料，前端用 React 做成 dashboard。

## 功能

- **戰績總覽**：最近 5 場的勝 / 和 / 負、進球、失球
- **已完賽**：比分、進球（時間、球員、烏龍球 / 點球）、紅黃牌
- **即將進行**：接下來 3 場的對手和開賽時間
- 曼聯固定顯示在左邊，並標示主場 / 客場
- 卡片左側依勝（綠）/ 和（灰）/ 負（紅）上色
- 載入中與讀取失敗的提示畫面

## 技術

| 部分 | 使用 |
|---|---|
| 後端 | Python 3（只用標準函式庫：`urllib`、`json`、`datetime`） |
| 資料來源 | Premier League Pulse API（`footballapi.pulselive.com`） |
| 前端 | React 19 + Vite |

## 專案結構

```
Eurpoe-football/
├── backend/
│   └── premier_league.py        # 抓 Pulse API，整理後輸出 JSON
└── frontend/
    ├── public/
    │   └── man_utd_summary.json # 後端產生，前端讀取的資料
    └── src/
        ├── App.jsx
        ├── PremierLeague.jsx    # 主頁面：fetch 資料、分成已完賽 / 即將進行
        ├── Summary.jsx          # 戰績總覽
        ├── MatchCard.jsx        # 單場比賽卡片
        ├── matchUtils.js        # 共用函式：判斷主客場、勝負
        └── index.css
```

## 資料流程

```
Pulse API ──> backend/premier_league.py ──> frontend/public/man_utd_summary.json ──> React (fetch)
```

目前還沒有 API server。Python 跑完會把 JSON 寫進 `frontend/public/`，React 再用 `fetch` 讀這個檔案。

## 如何執行

需要 **Python 3** 和 **Node.js 18 以上**。

**1. 產生資料**（要在專案根目錄執行，因為輸出路徑是相對路徑）

```bash
python3 backend/premier_league.py
```

**2. 啟動前端**

```bash
cd frontend
npm install
npm run dev
```

打開終端機顯示的網址（通常是 http://localhost:5173 ）。

> 重新跑 Python 更新 JSON 之後，瀏覽器要按 **Cmd + Shift + R** 強制重新整理，才會讀到新的資料。

## JSON 資料格式

```json
{
  "gameweek": 4,
  "kickoff": "Sun 13 Sep 2026, 16:30 BST",
  "status": "C",
  "home": { "team": "Man Utd", "score": 0 },
  "away": { "team": "Man City", "score": 1 },
  "goals": [{ "time": "60'00", "team": "Man City", "player": "Erling Haaland", "type": "G" }],
  "cards": [{ "time": "81'00", "team": "Man Utd", "player": "Harry Maguire", "card": "Y" }]
}
```

- `status`：`C` 已完賽、`U` 未開始。未完賽的 `score` 是 `null`
- `goals.type`：`G` 一般進球、`O` 烏龍球、`P` 點球
- `cards.card`：`Y` 黃牌、`R` 紅牌、`YR` 兩黃變一紅

## 接下來的計畫

- [ ] 後端改成 FastAPI，前端改成呼叫 API
- [ ] 可以選擇球隊，不只看曼聯
- [ ] 美化排版

## 備註

Pulse API 是英超官網使用的非公開 API，沒有官方文件，格式隨時可能改變。本專案僅供學習使用。

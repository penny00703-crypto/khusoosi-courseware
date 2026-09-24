# AUDIO_SOURCE_MAP · We Can 2 · Unit 1 · L1 Nice to Meet You

官方包：`refs/wecan2-official-audio/sb_2/`（mpi 官网 sb_2.zip，SHA-256 见 sb_2.sha256）
来源：https://mpi-contents.jp/sound/studentbook2/sb_2.zip
对轨方式：faster-whisper tiny 词级时间码 + 教材原文逐句对齐（refs/whisper-models/ 缓存）

| 页面用途 | 切片文件 | 原文件 | CD 小轨 | 起止（秒） | 标签 |
|---|---|---|---|---|---|
| S2 WC1 衔接问候 | a_official_name.mp3 | WC1 包 CDA03（跨册引用已核对） | CD1 03 | — | Official |
| S4 场景A（Turns 1–2） | a_official_scene_a.mp3 | 02 CDA03 Unit 1 Feelings_Talk Time.mp3 | CD1 03–04 | 13.10–19.40（尾 0.25s 淡出） | Official |
| S4 场景B（Turns 3–5） | a_official_scene_b.mp3 | 同上 | CD1 03–04 | 20.52–27.15（尾 0.25s 淡出） | Official |
| S4 教师整轨 / S14 Slow·Model | a_official_talktime.mp3 | 同上 | CD1 03–04 | 整轨（70s） | Official |
| 逐句 tt1 "It's nice to meet you" | a_official_tt1.mp3 | 同上 | CD1 03–04 | 15.34–16.88 | Official |
| 逐句 tt2 "…meet you, too" | a_official_tt2.mp3 | 同上 | CD1 03–04 | 17.14–19.26 | Official |
| 逐句 tt3 "Hi. How are you?" | a_official_tt3.mp3 | 同上 | CD1 03–04 | 20.64–22.76 | Official |
| 逐句 tt4 "I'm great, thanks. And you?" | a_official_tt4.mp3 | 同上 | CD1 03–04 | 23.24–25.70 | Official |
| 逐句 tt5 "I'm fine" | a_official_tt5.mp3 | 同上 | CD1 03–04 | 26.04–27.00 | Official |

待补（现为已审批 A 声线 TTS，标 Practice/Help）：
- 序数词 first–fifth（a_t_first.mp3 等）：官方源在 `04 CDA08 Unit 1 Words In Action.mp3`，尚未切。
- 任务引导、试音、反馈、补救 Slow：A 声线 en-US-AriaNeural（-2% / Slow -22%），Practice。

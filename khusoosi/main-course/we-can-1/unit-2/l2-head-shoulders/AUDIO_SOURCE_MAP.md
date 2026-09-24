# Lesson 9 音频来源记录

| 资产 | 来源 | 用途 | 说明 |
|---|---|---|---|
| `assets/a_official_cd1_16_18.mp3` | 桌面官方资源 `08 CDA16 Unit 2 Head Shoulders Knees and.mp3` | CD1 16 完整 Chant；主课首次输入、P16 Task 1、复习 Station 1 | 原文件约 79 秒。2026-09-24 经 Whisper 时间戳转写确认，内容只有 `Exercise 1 · Sing and point` 及整首 chant，没有 CD1 17 的单词点读或 CD1 18 的 Teacher Says。保留旧文件名仅为兼容，页面不得再标成“16–18 全覆盖”。SHA-256 `144762011222f7631a925bb710a6221f9ebf842addc240d212e529b99b014993` |
| `assets/a_official_cd1_16_first_line.mp3` | 从上述官方 CD1 16 的 00:09.58–00:13.85 裁切 | P3 `Try the chant now` | 官方原声第一句，约 4.31 秒；在句后静音区结束并做 0.20 秒淡出，不包含下一段音乐；用于任务承诺页立即进入 chant，不替代 P4 完整输入 |
| `assets/a_t_*.mp3` | A 声线 `en-US-AriaNeural` | 单词点读、指令示范、课堂引导、补救慢速、课后独立练习 | 支持性语音，不冒充教材原声；正常 `-2%`，Slow `-24%` |
| `assets/sfx_*.mp3` | 项目既有反馈音效 | 正确、错误、完成反馈 | 不承担语言输入 |

## CD1 17–18 缺轨处理

- 教材 P16 Task 2 对应 CD1 17，但当前下载包没有该录音；页面按 `head → shoulders → knees → toes → eyes → ears → mouth → nose` 串联现有 A 声线单词点读，并明确标为 `Practice model`。
- 教材 P16 Task 3 对应 CD1 18，但当前下载包没有该录音；页面串联四条 A 声线 `Touch your...` 指令，并明确标为 `Practice model`。
- 后续若取得真正 CD1 17/18，按教材活动逐条核听后替换 Practice model；在此之前禁止把 CD1 16 chant 重复绑定到三个任务。

原则：官方长轨与支持性语音在界面和文件名上分开；正式教材任务优先播放已核验的官方音频，缺轨时使用批准声线并清楚标注，不能靠文件编号范围推断内容覆盖。

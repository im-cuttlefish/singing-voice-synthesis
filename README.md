# singing-voice-synthesis

## メモ

### Walker

STFTは窓関数を「ずらしながらかける」という操作を要する。
つまり、時系列的に流れてくる離散時間信号を集めてきて、信号の集まりを返す必要がある。Walkerがその操作をしている。
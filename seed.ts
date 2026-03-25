import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env["SUPABASE_URL"]!,
  process.env["SUPABASE_ANON_KEY"]!
);

const cards = [
  { lesson:'[1]', section:'Fav', kanji:'不可欠', hira:'ふかけつ', pos:'な adjective · noun',
    english:'indispensable; essential; absolutely necessary',
    definition:'Indicates something that cannot be lacking without causing failure or incompleteness. Stronger than 必要 — implies non-negotiable necessity.',
    ex_jp:'成功には努力が不可欠だ。',
    ex_en:'Effort is indispensable for success.' },

  { lesson:'[1]', section:'Fav', kanji:'ざっと', hira:'ざっと', pos:'adverb',
    english:'roughly; quickly; briefly; in a general way',
    definition:'Implies speed + lack of thoroughness — a quick but superficial pass. Used with actions like 見る, 読む, 数える. ざっと目を通す = to skim through.',
    ex_jp:'資料をざっと読む。',
    ex_en:'To read the materials quickly / skim through them.' },

  { lesson:'[1]', section:'Fav', kanji:'質疑応答', hira:'しつぎおうとう', pos:'noun · する verb',
    english:'question-and-answer session; Q&A',
    definition:'A structured two-way exchange of questions and responses. More formal and institutional than 質問と回答. Commonly used in meetings, seminars, and press conferences.',
    ex_jp:'プレゼンの後に質疑応答があります。',
    ex_en:'There will be a Q&A after the presentation.' },

  { lesson:'[1]', section:'Fav', kanji:'並行', hira:'へいこう', pos:'noun · する verb',
    english:'parallel; proceeding simultaneously',
    definition:'Emphasizes independent but simultaneous progression. Tasks proceed without interfering with each other. Common in business/IT: 並行処理 (parallel processing).',
    ex_jp:'開発とテストを並行で行う。',
    ex_en:'To conduct development and testing simultaneously.' },

  { lesson:'[1]', section:'Fav', kanji:'連れ', hira:'つれ', pos:'noun',
    english:'companion; someone you are with',
    definition:'Neutral term for a person accompanying you — relationship unspecified (friend, partner, family). 連れがいる = I have someone with me. お連れ様 = polite form in service settings.',
    ex_jp:'連れと一緒に来た。',
    ex_en:'I came with a companion.' },

  { lesson:'[1]', section:'Fav', kanji:'人物', hira:'じんぶつ', pos:'noun',
    english:'person; figure; character; personage',
    definition:'A person considered in terms of their character, role, or significance. Slightly elevated vs. 人 — implies the person is noteworthy. 人物紹介 = character profiles in games/novels.',
    ex_jp:'彼は歴史上重要な人物だ。',
    ex_en:'He is an important figure in history.' },

  { lesson:'[1]', section:'General', kanji:'場面', hira:'ばめん', pos:'noun',
    english:'scene; situation; occasion; context',
    definition:'A specific situation, setting, or moment. Covers both fictional scenes and real-life social contexts. Paired with 〜に応じて, 〜に合わせて.',
    ex_jp:'場面に応じて対応する。',
    ex_en:'To respond depending on the situation.' },

  { lesson:'[1]', section:'General', kanji:'徒歩', hira:'とほ', pos:'noun',
    english:'walking; going on foot',
    definition:'Frames walking as a means of transportation. Slightly formal vs. 歩いて. Very common in directions: 徒歩5分 (5-minute walk). 徒歩圏内 = within walking distance.',
    ex_jp:'駅まで徒歩5分です。',
    ex_en:'It\'s a 5-minute walk to the station.' },

  { lesson:'[1]', section:'General', kanji:'施設', hira:'しせつ', pos:'noun',
    english:'facility; institution; establishment',
    definition:'Physical places equipped for a specific function/service. Emphasizes purpose-built infrastructure. Covers public, private, and specialized locations.',
    ex_jp:'公共施設を利用する。',
    ex_en:'To use public facilities.' },

  { lesson:'[1]', section:'General', kanji:'引き取り', hira:'ひきとり', pos:'noun · する verb',
    english:'collection; pickup; taking back; receiving',
    definition:'Taking something into one\'s possession from another place/person. In logistics: pickup. In disposal: collecting unwanted items. Implies a shift of responsibility.',
    ex_jp:'大型家具の引き取り。',
    ex_en:'Pickup/collection of large furniture.' },

  { lesson:'[1]', section:'General', kanji:'解散', hira:'かいさん', pos:'noun · する verb',
    english:'dispersal; breakup; dissolution',
    definition:'A group ceasing to stay together. Casual: people leave after an event. Formal: organizations disband. Political: 衆議院解散 (dissolution of parliament).',
    ex_jp:'現地で解散する。',
    ex_en:'To disband on-site / everyone goes their separate ways.' },

  { lesson:'[1]', section:'General', kanji:'下車する', hira:'げしゃする', pos:'する verb',
    english:'to get off (a train, bus, taxi)',
    definition:'Alighting from a vehicle, especially public transport. More formal than 降りる. Common in station announcements and navigation apps. 下車駅 = the station where you get off.',
    ex_jp:'次の駅で下車する。',
    ex_en:'To get off at the next station.' },

  { lesson:'[1]', section:'General', kanji:'石油', hira:'せきゆ', pos:'noun',
    english:'petroleum; crude oil; mineral oil',
    definition:'Refers to crude oil as a natural resource. Common in energy, economics, and geopolitics contexts. 石: stone + 油: oil (literally \'rock oil\').',
    ex_jp:'日本は多くの石油を輸入している。',
    ex_en:'Japan imports a large amount of petroleum.' },

  { lesson:'[1]', section:'General', kanji:'原材料', hira:'げんざいりょう', pos:'noun',
    english:'raw materials; base materials used in production',
    definition:'Materials in their unprocessed state used to make products. Emphasizes inputs at the earliest stage of production. Common in supply chain, manufacturing, and economics.',
    ex_jp:'原材料の価格が上昇している。',
    ex_en:'Raw material prices are rising.' },

  { lesson:'[1]', section:'General', kanji:'電気製品', hira:'でんきせいひん', pos:'noun',
    english:'electrical appliances; electronic/electric products',
    definition:'Products that operate using electricity — household appliances and consumer electronics. Broader than 家電 (home use only). Common in warranty, repair, and shopping contexts.',
    ex_jp:'電気製品を購入する。',
    ex_en:'To purchase electrical appliances.' },

  { lesson:'[1]', section:'General', kanji:'中心', hira:'ちゅうしん', pos:'noun · の noun',
    english:'center; core; main focus; primarily',
    definition:'The main part or focus around which other things revolve. 〜を中心に = centered on / mainly. Can be physical or conceptual.',
    ex_jp:'英語を中心に授業が行われる。',
    ex_en:'Classes are conducted mainly in English.' },

  { lesson:'[1]', section:'General', kanji:'圏内', hira:'けんない', pos:'noun',
    english:'within a zone; within range; within a sphere',
    definition:'Being inside a defined zone or sphere of influence — often approximate/conceptual. 徒歩圏内, 通勤圏内, 射程圏内. Opposite: 圏外 (out of range / no signal).',
    ex_jp:'徒歩圏内にコンビニがある。',
    ex_en:'There\'s a convenience store within walking distance.' },

  { lesson:'[1]', section:'General', kanji:'以内', hira:'いない', pos:'noun',
    english:'within; not exceeding; inside a limit',
    definition:'Staying at or below a strict numerical/measurable threshold. Inclusive of the stated limit. Used with numbers and units: 3日以内, 100メートル以内, 予算以内.',
    ex_jp:'3日以内にお返事ください。',
    ex_en:'Please reply within 3 days.' },

  { lesson:'[1]', section:'General', kanji:'再利用', hira:'さいりよう', pos:'noun · する verb',
    english:'reuse; reutilization; using something again',
    definition:'Using an item again in its current or slightly modified form. One of the 3Rs: リデュース・リユース・リサイクル. Applies to physical objects and abstract things like data.',
    ex_jp:'ペットボトルを再利用する。',
    ex_en:'To reuse plastic bottles.' },

  { lesson:'[1]', section:'General', kanji:'展示', hira:'てんじ', pos:'noun · する verb',
    english:'exhibition; display; showcasing to the public',
    definition:'Putting items on display for viewing — to inform, promote, or educate. Used for art, products, and events. 展示会 = an exhibition event. 展示品 = items on display.',
    ex_jp:'最新技術を展示する。',
    ex_en:'To showcase the latest technology.' },

  { lesson:'[1]', section:'General', kanji:'修理', hira:'しゅうり', pos:'noun · する verb',
    english:'repair; fixing; mending',
    definition:'Restoring something to working condition after damage or failure. Standard in service/business contexts. 修理受付 = repair desk; 修理依頼 = repair request.',
    ex_jp:'スマホを修理に出す。',
    ex_en:'To send a phone in for repair.' },

  { lesson:'[1]', section:'General', kanji:'早退する', hira:'そうたいする', pos:'する verb',
    english:'to leave early (from work or school)',
    definition:'Leaving before the scheduled end time for a recognized reason (illness, personal matters). Contrasts with 遅刻 (being late) and 欠席 (absence).',
    ex_jp:'体調不良で早退する。',
    ex_en:'To leave early due to illness.' },

  { lesson:'[1]', section:'General', kanji:'鉄鉱石', hira:'てっこうせき', pos:'noun',
    english:'iron ore',
    definition:'Naturally occurring rock containing iron, mined and processed into iron and steel. Key raw material in heavy industry. Often paired with 石炭 in steelmaking contexts.',
    ex_jp:'鉄鉱石を輸入する。',
    ex_en:'To import iron ore.' },

  { lesson:'[1]', section:'General', kanji:'輸出', hira:'ゆしゅつ', pos:'noun · する verb',
    english:'export; to export goods/services',
    definition:'Sending goods, products, or services out of a country to foreign markets. Opposite of 輸入. Used in trade, economics, and news. 輸出規制 = export regulations.',
    ex_jp:'日本は自動車を多く輸出している。',
    ex_en:'Japan exports many automobiles.' },

  { lesson:'[1]', section:'General', kanji:'輸入', hira:'ゆにゅう', pos:'noun · する verb',
    english:'import; to import goods/services',
    definition:'Bringing goods, products, or services into a country from abroad. Opposite of 輸出. Japan-related contexts often carry a nuance of external resource dependence.',
    ex_jp:'日本は多くの石油を輸入している。',
    ex_en:'Japan imports a large amount of petroleum.' },

  { lesson:'[1]', section:'General', kanji:'見学', hira:'けんがく', pos:'noun · する verb',
    english:'inspection tour; observation visit',
    definition:'Going somewhere to observe and learn firsthand. Not casual sightseeing — implies purposeful observation. Common in schools (社会科見学) and factories (工場見学).',
    ex_jp:'工場を見学する。',
    ex_en:'To tour a factory.' },

  { lesson:'[2]', section:'Fav', kanji:'なるべく', hira:'なるべく', pos:'adverb',
    english:'as much as possible; wherever possible; if at all possible',
    definition:'Expresses the speaker\'s intent to approach an ideal as closely as circumstances allow — softer and more realistic than できるだけ.',
    ex_jp:'なるべく早く来てください。',
    ex_en:'Please come as soon as possible.' },

  { lesson:'[2]', section:'Fav', kanji:'感染', hira:'かんせん', pos:'noun · する verb',
    english:'infection; contagion; contamination',
    definition:'Refers to the transmission and establishment of a pathogen into a host body. Also used metaphorically (e.g. computer viruses, catching someone\'s enthusiasm).',
    ex_jp:'ウイルスに感染する。',
    ex_en:'To be infected by a virus.' },

  { lesson:'[2]', section:'Fav', kanji:'処分', hira:'しょぶん', pos:'noun · する verb',
    english:'disposal; getting rid of; disciplinary action',
    definition:'In everyday contexts: throwing away / selling / donating something. In formal/legal contexts: a disciplinary measure or official ruling.',
    ex_jp:'不用品を処分する。',
    ex_en:'To dispose of unneeded items.' },

  { lesson:'[2]', section:'Fav', kanji:'活性酸素', hira:'かっせいさんそ', pos:'noun',
    english:'reactive oxygen species (ROS); free radicals',
    definition:'Chemically unstable oxygen-containing molecules produced in metabolism. Associated with aging, cell damage, and disease in health/beauty contexts.',
    ex_jp:'活性酸素が細胞を傷つける。',
    ex_en:'Reactive oxygen species damage cells.' },

  { lesson:'[2]', section:'Fav', kanji:'物質', hira:'ぶっしつ', pos:'noun',
    english:'substance; matter; material',
    definition:'Refers to any physical substance or chemical compound. Neutral and scientific in tone; highly productive in compound nouns.',
    ex_jp:'有害物質が体内に蓄積される。',
    ex_en:'Harmful substances accumulate inside the body.' },

  { lesson:'[2]', section:'Fav', kanji:'予防', hira:'よぼう', pos:'noun · する verb',
    english:'prevention; precaution; prophylaxis',
    definition:'Stopping something harmful before it occurs — carries an active, intentional nuance. 予防接種 (vaccination) is a key compound.',
    ex_jp:'これは癌の予防に効果があります。',
    ex_en:'This is effective in the prevention of cancer.' },

  { lesson:'[2]', section:'Fav', kanji:'しみ（染み・滲み）', hira:'しみ', pos:'noun',
    english:'stain; spot; blemish; dark spot (skin)',
    definition:'染み = stain on fabric or skin pigmentation (dark spots). 滲み = ink bleeding/spreading. In skincare, refers to hyperpigmentation or sun spots.',
    ex_jp:'日焼けによるしみ。',
    ex_en:'Dark spots caused by sun exposure.' },

  { lesson:'[2]', section:'Fav', kanji:'しまう（仕舞う）', hira:'しまう', pos:'う verb (transitive)',
    english:'to put away; to store; to tuck away in its place',
    definition:'Key nuance: not just \'put somewhere\' but \'return to its proper, designated place.\' Also functions as 〜てしまう (completion/regret) — a separate grammar usage.',
    ex_jp:'使ったものを元の場所にしまう。',
    ex_en:'Put things you\'ve used back in their original place.' },

  { lesson:'[2]', section:'Fav', kanji:'うとうと', hira:'うとうと', pos:'adverb · する verb',
    english:'to doze off; to drift in and out of sleep; to be half-asleep',
    definition:'Describes involuntary drowsiness — the liminal state between waking and sleeping. Soft, cozy connotation. Mimetic word (擬態語).',
    ex_jp:'授業中にうとうとしてしまった。',
    ex_en:'I dozed off during class.' },

  { lesson:'[2]', section:'Fav', kanji:'細胞', hira:'さいぼう', pos:'noun',
    english:'cell (biological)',
    definition:'The basic structural and functional unit of living organisms. Very commonly used in scientific, medical, and educational contexts.',
    ex_jp:'細胞が死滅する。',
    ex_en:'Cells die off / are destroyed.' },

  { lesson:'[2]', section:'General', kanji:'様子', hira:'ようす', pos:'noun',
    english:'appearance; state; situation; sign; look; demeanor',
    definition:'The observable condition or atmosphere of a person, place, or thing. Used when the speaker observes/infers from visible cues.',
    ex_jp:'様子を見る。',
    ex_en:'To wait and see / to observe the situation.' },

  { lesson:'[2]', section:'General', kanji:'動作', hira:'どうさ', pos:'noun · する verb',
    english:'action; movement; motion; operation',
    definition:'A discrete, purposeful physical or mechanical action. In tech/software: how a system operates. In instructions: a named step in a process.',
    ex_jp:'整理は「出す」「分ける」「減らす」「しまう」という４つの動作に分けられます。',
    ex_en:'Tidying can be broken into four operations: "take out," "sort," "reduce," and "put away."' },

  { lesson:'[2]', section:'General', kanji:'外出', hira:'がいしゅつ', pos:'noun · する verb',
    english:'going out; leaving the house; being out',
    definition:'Leaving one\'s home/residence to go outside. Slightly formal vs. 出かける. 外出中 (currently out) is a standard workplace phrase.',
    ex_jp:'不要不急の外出を避ける。',
    ex_en:'To avoid unnecessary and non-urgent outings.' },

  { lesson:'[2]', section:'General', kanji:'反抗', hira:'はんこう', pos:'noun · する verb',
    english:'defiance; resistance; rebellion; opposition',
    definition:'Active pushback against authority or rules. 反抗期 (rebellious phase) commonly refers to adolescent rebellion in parenting/psychology contexts.',
    ex_jp:'反抗期に入った。',
    ex_en:'Entered the rebellious phase.' },

  { lesson:'[2]', section:'General', kanji:'美容', hira:'びよう', pos:'noun',
    english:'beauty care; cosmetic care; grooming',
    definition:'The practice of maintaining or enhancing physical appearance (skin, hair, face). A staple term in advertising, magazines, and health journalism.',
    ex_jp:'美容に気を使う。',
    ex_en:'To take care of one\'s appearance.' },

  { lesson:'[2]', section:'General', kanji:'思うように', hira:'おもうように', pos:'phrase · adverb',
    english:'as one hopes; as expected; according to one\'s wishes',
    definition:'Almost always in negative form: 思うようにいかない (things don\'t go as hoped). Implies personal expectation — always relative to what someone wants.',
    ex_jp:'親が思うように育たないこともある。',
    ex_en:'There are times when children don\'t grow up the way their parents hope.' },

  { lesson:'[2]', section:'General', kanji:'一員', hira:'いちいん', pos:'noun',
    english:'a member (of a group); one of the members',
    definition:'Emphasizes belonging — being recognized as a legitimate part of a group. Often carries emotional weight. Used with として: 〜の一員として (as a member of).',
    ex_jp:'家族の一員として扱われることが多い。',
    ex_en:'They are often treated as a member of the family.' }
];
const { error } = await supabase.from('flashcards').insert(cards);
if (error) console.error(error);
else console.log('Seeded!');

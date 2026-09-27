// Popular Pokemon across every generation, most popular first. Hand-curated:
// led by the top of the 2020 "Pokemon of the Year" worldwide fan vote, then
// mascots, starters, legendaries and anime favorites, with Gen 9 favorites
// (released after the vote) mixed in. Species IDs.

export const POPULAR_SCOPE_PREFIX = 'popular-'
export const POPULAR_TIERS = [50, 100, 200]

const POPULAR_IDS: number[] = [
  // Top 50
  658, 448, 778, 6, 197, 700, 445, 384, 94, 149,
  25, 282, 133, 257, 150, 151, 571, 887, 380, 381,
  196, 609, 248, 612, 330, 373, 376, 1, 4, 7,
  9, 3, 131, 143, 130, 249, 250, 491, 483, 484,
  487, 493, 681, 745, 727, 724, 392, 350, 59, 135,
  // 51-100
  134, 136, 470, 471, 38, 54, 39, 52, 468, 245,
  243, 244, 144, 145, 146, 385, 382, 383, 643, 644,
  646, 716, 717, 791, 792, 888, 889, 1007, 1008, 906,
  909, 912, 815, 818, 812, 908, 911, 914, 959, 983,
  26, 132, 129, 104, 175, 635, 637, 706, 405, 359,
  // 101-200
  722, 725, 728, 810, 813, 816, 650, 653, 656, 495,
  498, 501, 387, 390, 393, 252, 255, 258, 152, 155,
  158, 260, 254, 157, 160, 395, 389, 1000, 937, 936,
  925, 921, 802, 807, 251, 386, 494, 492, 647, 649,
  719, 720, 721, 801, 718, 800, 890, 877, 845, 849,
  823, 884, 862, 172, 113, 242, 122, 95, 92, 65,
  68, 12, 18, 35, 37, 79, 83, 123, 212, 142,
  147, 202, 214, 229, 227, 302, 303, 334, 461, 475,
  478, 479, 530, 587, 663, 701, 709, 748, 784, 785,
  768, 773, 1017, 1009, 1024, 1025, 998, 970, 979, 858,
]

/** First `count` Pokemon of the popular list, most popular first */
export function popularIds(count: number): number[] {
  return POPULAR_IDS.slice(0, count)
}

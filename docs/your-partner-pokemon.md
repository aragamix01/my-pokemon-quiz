นี่คือเกมสำหรับตอบคำถามเลือก pokemon ประจำตัวของผู้เล่น

กติกา
 - จะมีคำถามเป็นเรื่องง่ายๆใกล้ตัว เช่น ชอบสีอะไร ถ้าเจอเหตุการณ์แบบนี้จะเลือกอะไร นิสัยอย่างไร โดยเป็นคำถามง่ายๆ สนุกๆ
 - คำถามจะมีทั้งหมด 30 ข้อ อยากให้ช่วยคิดจาก pokemon-metadata ที่เก็บอยู่ใน local db สามารถเอาข้อมูลทั้งหมดมาเป็นคำถามได้ แต่อยากให้เป็นคำถามง่ายๆ ไม่ลึกจนเกินไป เช่นถามวันเกิดมาไป match กับ pokemon dex no. ก็ได้แล้วแต่จะพิจารณา โดยคำถามแต่ละข้อจะมี choice ให้เลือกอย่างน้อย 4 choice
 - โดยเกมจะทำการสุ่มคำถามมาถาม 10 ข้อจาก 30 ข้อเท่านั้น และพิจารณาให้ match กับ pokemon จาก metadata ตามความเหมาะสม
 - ถ้าต้องการสร้างไฟล์ json สำหรับเก็บข้อมูลอะไรใหม่สามารถทำได้เลย folder data
 - จาก choice ที่ user เลือกอยากให้บอกด้วยว่า user เป็นคนยังไง พิจารณาจาก pokemon ที่เป็นผลลัพท์ จากข้อนี้น่าจะต้องทำ metadata ใหม่ของ pokemon แต่ละตัวอารมณ์เหมือนการดูดวงแล้วเก็บลงใน folder data ไม่ต้องยาวมาก ขอแบบกระชับๆกินใจ เป็นไปในทางที่ดีเสมอ ให้ user อ่านแล้วสบายใจ
 - เมื่อได้เกณฑ์คำถามแล้วช่วยสรุปมาให้หน่อย เดี๋ยวจะพิจารณาแล้วบอกว่าให้ทำต่อไป

================================================================================

Pokemon Partner Quiz Requirements

Game Concept: A personality quiz that matches users with their ideal partner Pokemon based on simple, fun questions.

Quiz Structure:
- 30 total questions created from Pokemon metadata in the local database
- 10 random questions selected per game session
- Each question has minimum 4 choices
- Questions should be simple, fun, and relatable (favorite colors, personality traits, situational choices)
- Can incorporate Pokemon data like birthday matching with Pokedex numbers

Technical Requirements:
1. Use existing pokemon-metadata.json from local database
2. Create new JSON files in data/ folder as needed
3. Create Pokemon personality descriptions for results - concise, positive, comforting horoscope-style descriptions
4. Match user choices to appropriate Pokemon based on their characteristics

Output:
- User gets matched with a Pokemon partner
- Personality description explaining what kind of person they are based on their Pokemon match
- Descriptions should be uplifting and positive

The user wants me to summarize the quiz criteria first, then they'll decide whether to proceed with implementation.

Summary: Create a 30-question personality quiz that randomly selects 10 questions per session, matches users with Pokemon partners based on their answers, and provides positive personality insights based on the matched
Pokemon.
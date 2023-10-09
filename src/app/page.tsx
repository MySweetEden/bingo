'use client'

import styles from './page.module.css'
import { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'

export default function Home() {
  const initialSquares: {[key: string]: boolean} = {
    "公衆トイレ": false,
    "ブランコ": false,
    "ロードバイク": false,
    "パトカー": false,
    "軽トラ": false,
    "４階建ての家": false,
    "コンビニ３社全て": false,
    "テント": false,
    "銭湯": false,
    "黄色い車": false,
    "滑り台": false,
    "お墓": false,
    "ビンゴ": true,
    "図書館": false,
    "散歩中の犬": false,
    "花壇": false,
    "学校のポスター": false,
    "喫煙所": false,
    "ゴミ箱": false,
    "猫": false,
    "銀行": false,
    "レンガ造りの建物": false,
    "鳥": false,
    "紫色の花": false,
    "噴水": false
  };
  const checkBingo = (squares: {[key: string]: boolean}) => {
    const bingoConditions = [
      [0, 1, 2, 3, 4], // Horizontal top row
      [5, 6, 7, 8, 9], // Horizontal second row
      [10, 11, 12, 13, 14], // Horizontal third row
      [15, 16, 17, 18, 19], // Horizontal fourth row
      [20, 21, 22, 23, 24], // Horizontal bottom row
      [0, 5, 10, 15, 20], // Vertical left column
      [1, 6, 11, 16, 21], // Vertical second column
      [2, 7, 12, 17, 22], // Vertical third column
      [3, 8, 13, 18, 23], // Vertical fourth column
      [4, 9, 14, 19, 24], // Vertical right column
      [0, 6, 12, 18, 24], // Diagonal from top-left to bottom-right
      [4, 8, 12, 16, 20]  // Diagonal from top-right to bottom-left
    ];
    const bingoResults = bingoConditions.map(condition => {
      return condition.every(index => squares[Object.keys(squares)[index]]);
    });
    return bingoResults.some(bool => bool === true);;
  };

  const [squares, setSquares] = useState(initialSquares);
  const [isBingo, setIsBingo] = useState(false);

  const handleButtonClick = (content: string) => {
    const nextSquares = {
      ...squares,
      [content]: !squares[content]
    }
    setSquares(prevSquares => (nextSquares));
    setIsBingo(checkBingo(nextSquares))
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.center}>お散歩ビンゴ</h1>
      <Box marginTop="5vh" />
      <Grid container columns={24} spacing={0}>
        {Object.entries(squares).map(([content, pushed], index)=>(
          <>
            {index % 5 === 0 && <Grid item xs={2} md={7} key={content+"LeftSpace"} />}
            <Grid item xs={4} md={2}>
              <Button  className={styles.button}
                onClick={()=>{handleButtonClick(content)}}
                variant={pushed ? "outlined" : "contained"} key={content+"Button"}>
                <span key={content+"Text"}>
                  {content}
                </span>
              </Button>
            </Grid>
            {index % 5 === 4 && <Grid item xs={2} md={7} key={content+"RightSpace"} />}
          </>
        ))}
      </Grid>
      <Box marginTop="5vh" />
      {isBingo && <h1 className={styles.center}>お散歩クリア！</h1>}
    </main>
  )
}

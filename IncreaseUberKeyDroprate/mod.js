const treasureclassexFilenames = ['global\\excel\\treasureclassex.txt', 'global\\excel\\base\\treasureclassex.txt'];
treasureclassexFilenames.forEach((treasureclassexFilename) => {
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);

  function MultiplyProb(row, item) {
    for (let i = 1; i <= 10; i++) {
      if (row['Item' + i] === item) {
        row['Prob' + i] = Math.floor(row['Prob' + i] * config.multiplier);
        return;
      }
    }
  }

  treasureclassex.rows.forEach((row) => {
    const treasureClass = row['Treasure Class'];

    if (treasureClass.startsWith('Countess Item (H)'))
      MultiplyProb(row, 'pk1')

    if (treasureClass.startsWith('Summoner (H)') || treasureClass.startsWith('Summoner Item (H)'))
      MultiplyProb(row, 'pk2')

    if (treasureClass.startsWith('Nihlathak (H)') || treasureClass.startsWith('Nihlathak Item (H)'))
      MultiplyProb(row, 'pk3')
  });
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
});
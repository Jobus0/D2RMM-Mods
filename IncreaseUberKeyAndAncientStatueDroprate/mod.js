const treasureclassexFilenames = ['global\\excel\\treasureclassex.txt', 'global\\excel\\base\\treasureclassex.txt'];
treasureclassexFilenames.forEach((treasureclassexFilename) => {
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
  if (!treasureclassex || treasureclassex.rows.length === 0) return;

  function MultiplyProb(row, item) {
    for (let i = 1; i <= 10; i++) {
      if (row['Item' + i] === item) {
        row['Prob' + i] = Math.floor(row['Prob' + i] * config.multiplier);
        return;
      }
    }
  }

  treasureclassex.rows.forEach((row) => {
    MultiplyProb(row, 'pk1');
    MultiplyProb(row, 'pk2');
    MultiplyProb(row, 'pk3');

    MultiplyProb(row, 'Ancient Statue 1');
    MultiplyProb(row, 'Ancient Statue 2');
    MultiplyProb(row, 'Ancient Statue 3');
    MultiplyProb(row, 'Ancient Statue 4');
    MultiplyProb(row, 'Ancient Statue 5');
  });
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
});
const treasureclassexFilenames = ['global\\excel\\treasureclassex.txt', 'global\\excel\\base\\treasureclassex.txt'];
treasureclassexFilenames.forEach((treasureclassexFilename) => {
  const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
  if (!treasureclassex || treasureclassex.rows.length === 0) return;

  function MultiplyProb(row, item, mult) {
    for (let i = 1; i <= 10; i++) {
      if (row['Item' + i] === item) {
        row['Prob' + i] = Math.floor(row['Prob' + i] * mult);
        return;
      }
    }
  }

  treasureclassex.rows.forEach((row) => {
    MultiplyProb(row, 'pk1', config.multiplier);
    MultiplyProb(row, 'pk2', config.multiplier);
    MultiplyProb(row, 'pk3', config.multiplier);

    MultiplyProb(row, 'Ancient Statue 1', config["statue-multiplier"]);
    MultiplyProb(row, 'Ancient Statue 2', config["statue-multiplier"]);
    MultiplyProb(row, 'Ancient Statue 3', config["statue-multiplier"]);
    MultiplyProb(row, 'Ancient Statue 4', config["statue-multiplier"]);
    MultiplyProb(row, 'Ancient Statue 5', config["statue-multiplier"]);
  });
  D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
});
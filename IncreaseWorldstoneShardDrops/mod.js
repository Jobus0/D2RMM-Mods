const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
if (!treasureclassex || treasureclassex.rows.length === 0) return;

treasureclassex.rows.forEach((row) => {
  if (row["Treasure Class"].includes("Terrorize Act Consumable Desecrated")) {
    const currentNoDrop = parseInt(row.NoDrop);
    if (currentNoDrop > 0) {
      row.NoDrop = Math.floor(currentNoDrop / config.multiplier);
    }
  }
});

D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
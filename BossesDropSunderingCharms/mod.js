if (config.enableregularitempool) {
  const uniqueitemsFilenames = ['global\\excel\\uniqueitems.txt', 'global\\excel\\base\\uniqueitems.txt'];
  uniqueitemsFilenames.forEach((uniqueitemsFilename) => {
    const uniqueitems = D2RMM.readTsv(uniqueitemsFilename);

    uniqueitems.rows.forEach((row) => {
      let index = row.index;

      if (index === 'Cold Rupture')
        row.enabled = 1;

      if (index === 'Flame Rift')
        row.enabled = 1;

      if (index === 'Crack of the Heavens')
        row.enabled = 1;

      if (index === 'Rotting Fissure')
        row.enabled = 1;

      if (index === 'Bone Break')
        row.enabled = 1;

      if (index === 'Black Cleft')
        row.enabled = 1;
    });
    D2RMM.writeTsv(uniqueitemsFilename, uniqueitems);
  });
}

if (config.enablebossitempool && config.bossdropweight > 0) {
  const bosses = ['Andariel (H)', 'Andarielq (H)', 'Duriel (H) - Base', 'Durielq (H) - Base', 'Mephisto (H)', 'Mephistoq (H)', 'Diablo (H)', 'Diabloq (H)', 'Baal (H)', 'Baalq (H)'];
  const minorbosses = ['Blood Raven (H)', 'Radament (H)', 'Summoner (H)', 'Izual (H)', 'Haphesto (H)', 'Nihlathak (H)'];

  const treasureclassexFilenames = ['global\\excel\\treasureclassex.txt', 'global\\excel\\base\\treasureclassex.txt'];
  treasureclassexFilenames.forEach((treasureclassexFilename) => {
    const treasureclassex = D2RMM.readTsv(treasureclassexFilename);

    let index = 0;
    treasureclassex.rows.forEach((row) => {
      let treasureClass = row['Treasure Class'];

      if (treasureClass === 'Sunder Charms') {
        let sunderCharmsMod = {
          'Treasure Class': "Sunder Charms (Mod)",
          Picks: 1,
          NoDrop: 0
        };

        for (let i = 1; i <= 10; i++) {
          if (row['Item' + i] !== '') {
            sunderCharmsMod['Item' + i] = row['Item' + i];
            sunderCharmsMod['Prob' + i] = config.equaldropratio ? '1' : row['Prob' + i];
          }
        }

        treasureclassex.rows.splice(index + 1, 0, sunderCharmsMod); // insert right below the original Sunder Charms row
      }

      if (bosses.includes(treasureClass)) {
        row['NoDrop'] *= 50;

        let totalWeight = 0;
        for (let i = 1; i <= 10; i++) {
          if (row['Item' + i] == '') {
            row['Item' + i] = 'Sunder Charms (Mod)';
            row['Prob' + i] = Math.max(Math.round((config.bossdropweight / 100) * totalWeight), 1);
            break;
          }
          else {
            row['Prob' + i] *= 50;
            totalWeight += +row['Prob' + i];
          }
        }
      }

      if (minorbosses.includes(treasureClass)) {
        row['NoDrop'] *= 50;

        let totalWeight = 0;
        for (let i = 1; i <= 10; i++) {
          if (row['Item' + i] == '') {
            row['Item' + i] = 'Sunder Charms (Mod)';
            row['Prob' + i] = Math.max(Math.round((config.bossdropweight / 200) * totalWeight), 1);
            break;
          }
          else {
            row['Prob' + i] *= 50;
            totalWeight += +row['Prob' + i];
          }
        }
      }

      index++;
    });
    D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
  });
}
const itemNamesFilename = 'local\\lng\\strings\\item-nameaffixes.json';
const itemNames = D2RMM.readJson(itemNamesFilename);
itemNames.forEach((item) => {
  const itemtype = item.Key;
  let newName = null;

  if (itemtype === 'Hiquality') {
    newName = config.superiorPrefix;
  }

  if (itemtype === 'Damaged' || itemtype === 'Cracked' || itemtype === 'Low Quality' || itemtype === 'Crude') {
    if (config.grayInferior) {
      newName = `ÿc5` + config.inferiorPrefix;
    }
    else {
      newName = config.inferiorPrefix;
    }
  }

  if (newName != null) {
    // update all localizations
    for (const key in item) {
      if (key !== 'id' && key !== 'Key') {
        item[key] = newName;
      }
    }
  }
});
D2RMM.writeJson(itemNamesFilename, itemNames);

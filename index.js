const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file
fs.createReadStream('input.csv')
  .pipe(csv())
  .on('data', (row) => {
    const question = row.question;
    const expected = JSON.parse(row.__expected);

    const jsonlEntry = {
      input: {
        role: 'user',
        content: question
      },
      ideal: {
        "Level 1": [expected.subjectTags["Level1"]],
        "Level 2": [expected.subjectTags["Level2"]],
        "Level 3": expected.subjectTags["Level3"],
        "Skills": expected.skillTags
      }
    };

    fs.appendFileSync('output.jsonl', JSON.stringify(jsonlEntry) + '\n');
  })
  .on('end', () => {
    console.log('CSV to JSONL conversion complete.');
  });

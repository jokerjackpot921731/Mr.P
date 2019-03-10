const ps = require('python-shell');
const fs = require('fs');
ps.PythonShell.run('convert_csv_to_json.py', null, function (err, results) {
  if (err) throw err;
  console.log('finished');
  console.log(results);
  var contents = fs.readFileSync('./data/json_file_1.json');
  var jsonContents = JSON.parse(contents);
  console.log(jsonContents);
});

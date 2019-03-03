const ps = require('python-shell')
ps.PythonShell.run('convert_csv_to_json.py', null, function (err, results) {
  if (err) throw err;
  console.log('finished');
  console.log(results);
});
var http = require("http");

// sample of output
// {
//   "status": 0,
//   "current_time": 20171030174000
// }

function get_curr_time() {
  function pad2(n) { return (n > 9 ? '' : '0') + n }
  let d = new Date(),
    curr_time_str = '',
    res = {},
    mm = d.getMonth() + 1,
    dd = d.getDate(),
    hh = d.getHours(),
    ii = d.getMinutes(),
    ss = d.getSeconds();

  res.status = 0;

  curr_time_str += d.getFullYear();
  curr_time_str += pad2(mm);

  curr_time_str += pad2(dd);
  curr_time_str += pad2(hh);

  curr_time_str += pad2(ii);
  curr_time_str += pad2(ss);

  res.current_time = curr_time_str;

  return JSON.stringify(res);
}


http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/get_curr_time') {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the response body as "current time"
    response.end(get_curr_time());
  } else {
    response.statusCode = 404;
    response.end();
  }

}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
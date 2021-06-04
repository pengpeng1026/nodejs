// 创建buffer的方式
let buf1 = Buffer.from('hello world')
console.log(buf1);//<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

//创建一个指定大小的buffer，参数是大小
console.log(Buffer.alloc(10));

// 创建一个指定大小的buffer，不安全的方式，可能携带敏感信息
console.log(Buffer.allocUnsafe(10));
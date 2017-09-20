var n = 10
var sort = {}
var num = 0
while(n) {
    n-=1
	if(n>1) {
    	n-=2
        num++
        sort[2] = 1
    }
    if(n>5) {
    	n-=5
        num++
         sort[5] = 1
    }
    if(n>10) {
    	n-=10
        num++
         sort[10] = 1
    }
    if(n>20) {
      n-=20
      num++
       sort[20] = 1
    }
    if(n>50) {
       n-=50
       num++
        sort[50] = 1
    }
   
    
    if(n > 100) {
      n-=100
      num++
       sort[100] = 1
    }
    console.log(n)
}
var len = Object.keys(sort).length

console.log(len+' '+num)
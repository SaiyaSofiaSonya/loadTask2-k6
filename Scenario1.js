import { group, check } from "k6";
import http from "k6/http";


export let options = {
    scenarios: {
  orders_test: {
           
      executor: 'constant-arrival-rate',
      rate: 50, 
	  timeUnit: '60m',
      duration: '15m',
      preAllocatedVUs: 1,
      maxVUs: 1,
	  exec:'default',
    }
  },
};	

  


export default function() {
  

  
  group("orders", function() {
    group("open website", function() {
       let res  = http.get("http://185.233.0.230:3000/");
   	  console.log(String(res.status)+" open website");
	  check(res, {
        "status code is 200": (res) => res.status == 200,
     });
    });
    group("make an order", function() {
	var url = 'http://185.233.0.230:3000/api/orders';
	var body = JSON.stringify(
	{
		  name:'test',
		  email:'test@traxess.ru',
		  adress:'test',
		  cartItems:
		  [{_id:'sushi2',
		  title:'California',
		  image:'/images/sushi2.jpg',
		  description:'USA wibe',
		  price:600,
		  availableSizes:['Small','Big'],
		  count:2}]});
	var params={
		 headers: {
      'Accept': '*/*',
	  'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0',
	  },
	  
  };
		
	
  let res  = http.post(url, body, params);
   
  
  console.log(String(res.status)+" /make an order");
      check(res, {
       "status code is 200": (res) => res.status == 200,
     });
    });
  });
};
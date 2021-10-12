const {Pool}=require('pg')

const pool= new Pool({
    host:'localhost',
    user:'postgres',
    password:'1234',
    database:'keystone'
})

const getcontainer=async(req,res)=>{
    const response= await pool.query('select * from container');
    res.json(response.rows)
 }

 const getcontainerbyid=async(req,res)=>{
    const response = await pool.query('select * from container WHERE id_container=$1',[req.params.id])
    res.json(response.rows)
}

const deletecontainerbyid=async(req,res)=>{
    const response = await pool.query('DELETE FROM container WHERE id_container=$1',[req.params.id])
    console.log(response)
    res.json('cointainer deleted')
}

const updatecontainer= async(req,res)=>{
    const{container_num,capacity,address}=req.body;
    const response = await pool.query('UPDATE container SET container_num=$1,capacity=$2,address,$3 WHERE id_update=$4',[container_num,capacity,address,req.params.id])
    res.send('container uptdated')
}

const getauth=async(req,res)=>{
    const response= await pool.query('select * from authentication');
    res.json(response.rows)
 }

 const getauthbyid=async(req,res)=>{
    const response = await pool.query('select * from authentication WHERE id_auth=$1',[req.params.id])
    res.json(response.rows)
}

const deleteauthbyid=async(req,res)=>{
    const response = await pool.query('DELETE FROM authentication WHERE id_auth=$1',[req.params.id])
    console.log(response)
    res.json('user deleted')
}

const updateauth= async(req,res)=>{
    const{email,passwd}=req.body;
    const response = await pool.query('UPDATE authentication SET email=$1,passwd=$2 WHERE id=$3',[email,passwd,req.params.id])
    res.send('user updated')
}

const getdelivery=async(req,res)=>{
    const response= await pool.query('select * from delivery_person');
    res.json(response.rows)
 }

 const getdeliverybyid=async(req,res)=>{
    const response = await pool.query('select * from delivery_person WHERE id_delivery=$1',[req.params.id])
    res.json(response.rows)
}

const deletedeliverybyid=async(req,res)=>{
    const response = await pool.query('DELETE FROM delivery_person WHERE id_delivery=$1',[req.params.id])
    console.log(response)
    res.json('user deleted')
}

const updatedelivery= async(req,res)=>{
    const{username, address, phone_num, status, id_vehicle}=req.body;
    const response = await pool.query('UPDATE administrator SET username=$1,address=$2,phone_num=$3,status=$4,id_vehicle=$5 WHERE id_delivery=$6',[username, address, phone_num,status,id_vehicle,req.params.id])
    res.send('user updated')
}


const getadministrators=async(req,res)=>{
    const response= await pool.query('select * from administrator');
    res.json(response.rows)
 }

 const getadminbyid=async(req,res)=>{
    const response = await pool.query('select * from administrator WHERE id_admin=$1',[req.params.id])
    res.json(response.rows)
}

const deleteadminbyid=async(req,res)=>{
    const response = await pool.query('DELETE FROM administrator WHERE id_admin=$1',[req.params.id])
    console.log(response)
    res.json('user deleted')
}

const updateadmin= async(req,res)=>{
    const{username, address, phone_num}=req.body;
    const response = await pool.query('UPDATE administrator SET username=$1,address=$2,phone_num=$3 WHERE id_admin=$4',[username, address, phone_num,req.params.id])
    res.send('user updated')
}


const getcustomers=async(req,res)=>{
   const response= await pool.query('select * from customer');
   res.json(response.rows)
}

const getcustomersbyid=async(req,res)=>{
    const response = await pool.query('select * from customer WHERE id_customer=$1',[req.params.id])
    res.json(response.rows)
}


"revisar "
const createcustomer=async(req,res)=>{
    const{username, address, phone_num, pay_method,id_auth}=req.body;
    const response2 = await pool.query('INSERT INTO customer (username, address, phone_num, pay_method, id_auth) VALUES($1,$2,$3,$4,$5)',[username, address, phone_num, pay_method, id_auth]);
    console.log(response2);
    res.send('user created')
}

const deletecustomersbyid=async(req,res)=>{
    const response = await pool.query('DELETE FROM customer WHERE id_customer=$1',[req.params.id])
    console.log(response)
    res.json('user deleted')
}

const updatecustomer= async(req,res)=>{
    const{username, address, phone_num, pay_method}=req.body;
    const response = await pool.query('UPDATE customer SET username=$1,address=$2,phone_num=$3,pay_method=$4 WHERE id_customer=$5',[username, address, phone_num, pay_method,req.params.id])
    res.send('user updated')
}
module.exports={getcustomers,createcustomer,getcustomersbyid,deletecustomersbyid,updatecustomer,
    getadminbyid,getadministrators,deleteadminbyid,updateadmin,
    getdelivery,getdeliverybyid,deletedeliverybyid,updatedelivery,
    getauth,getauthbyid,deleteauthbyid,updateauth,
    getcontainer,getcontainerbyid,deletecontainerbyid,updatecontainer}
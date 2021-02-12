const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bookmark');

const Shopping = db.define('Shopping',{
  location:{
      type: STRING,
      allowNull:false,
  }

});

const syncAndSeed = async()=>{
  await db.sync({force:true});
  await Shopping.create({location:'TJ'});
  console.log('Hi');
  await Shopping.create({location:'Whole Food'});
}

// console.log(db);

const init = async()=>{
  try{
      await db.authenticate();
      await syncAndSeed();
      console.log(await Shopping.findAll());
  }
  catch(err){
      console.log(err);
  }
}

init();
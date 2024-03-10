import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users",(table)=>{
        table.text("id").notNullable().unique().primary();
        table.string("display_name").notNullable();
        table.string("mobile").notNullable().unique()
        table.string("email").notNullable().unique()
        table.string("password").notNullable()
        table.enu('role',["admin","laundryman","delivery","customer"]).notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at")
    })
    await knex.schema.createTable("customer_meta",(table)=>{
        table.string("area").notNullable()
        table.string("area_value").notNullable()
        table.string("district").notNullable()
        table.string("district_value").notNullable()
        table.string("station").notNullable()
        table.string("station_value").notNullable()
        table.string("address").notNullable()
        
        table.text("customer_id").unsigned();
        table.foreign("customer_id").references("users.id");
    })
    await knex.schema.createTable("staff_meta",(table)=>{
        table.string("work_location").notNullable()
        
        table.text("staff_id").unsigned();
        table.foreign("staff_id").references("users.id");
    })
    await knex.schema.createTable("orders",(table)=>{
        table.increments("id");

        table.string("order_items").notNullable();
        // table.integer("poundWash")
        // table.integer("dryCleaning")
        // table.integer("washShoes")
        // table.integer("leatherWashBag")
        table.string("pickup_date_time").notNullable();
        table.string("area").notNullable();
        table.string("area_value").notNullable();
        table.string("district").notNullable();
        table.string("district_value").notNullable();
        table.string("station").notNullable();
        table.string("station_value").notNullable();
        table.string("address").notNullable();
        table.string("remarks").nullable();

        table.enu('status',["w_pickup","w_quote","w_clean","w_delivery","complete"]).notNullable()
        
        table.text("customer_id").unsigned();
        table.foreign("customer_id").references("users.id");

        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at")
    })
    await knex.schema.createTable("pickup",(table)=>{
        table.increments("id");
        table.string("pickup_items").notNullable();
        table.string("start_pickup_date_time").notNullable();
        table.string("end_pickup_date_time");
        table.string("remarks")        

        table.text("delivery_id").unsigned();
        table.foreign("delivery_id").references("users.id");
        table.integer("orders_id").unsigned();
        table.foreign("orders_id").references("orders.id");

    })
    await knex.schema.createTable("quote",(table)=>{
        table.increments("id");


        table.string("quote_items").notNullable();
        table.string("currency").notNullable();
        table.string("amount").notNullable();
        table.string("remarks")
                
        table.text("delivery_id").unsigned();
        table.foreign("delivery_id").references("users.id");
        table.integer("orders_id").unsigned();
        table.foreign("orders_id").references("orders.id");
        table.timestamp("created_at").defaultTo(knex.fn.now())
    })

    await knex.schema.createTable("clean",(table)=>{
        table.increments("id");

        table.string("clean_items").notNullable();
        table.string("start_clean_date_time").notNullable();
        table.string("end_clean_date_time");
        table.string("remarks")
                
        table.text("laundryman_id").unsigned();
        table.foreign("laundryman_id").references("users.id");
        table.integer("orders_id").unsigned();
        table.foreign("orders_id").references("orders.id");
    })
    await knex.schema.createTable("delivery",(table)=>{
        table.increments("id");

        table.string("delivery_items").notNullable();
        table.string("start_delivery_date_time").notNullable();
        table.string("end_delivery_date_time");
        table.string("remarks")
        
        table.text("delivery_id").unsigned();
        table.foreign("delivery_id").references("users.id");
        table.integer("orders_id").unsigned();
        table.foreign("orders_id").references("orders.id");
    })
    await knex.schema.createTable("languague",(table)=>{
        table.increments("id");
        table.text("cn").notNullable();
        table.text("eng").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("languague")
    await knex.schema.dropTable("delivery")
    await knex.schema.dropTable("clean")
    await knex.schema.dropTable("quote")
    await knex.schema.dropTable("pickup")
    await knex.schema.dropTable("orders")
    await knex.schema.dropTable("staff_meta")
    await knex.schema.dropTable("customer_meta")
    await knex.schema.dropTable("users")
    
}


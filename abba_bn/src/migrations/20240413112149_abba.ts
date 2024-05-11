import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users",(table)=>{
        table.text("id").notNullable().unique().primary();
        table.string("display_name").notNullable();
        table.string("mobile").notNullable().unique()
        table.string("email").notNullable().unique()
        table.string("password").notNullable()
        table.enu('role',["admin","customer","delivery","laundry"]).notNullable()
        table.enu('status',["active","non_active"]).notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at")
    })
    await knex.schema.createTable("customer_meta",(table)=>{
        table.string("full_address").notNullable();
        
        
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
        table.enu('order_type',["pw","dc","ws","lw","cs","fw"]).notNullable();
        table.integer('pc').notNullable();
        table.string("pickup_date_time").notNullable();
        table.string("delivery_date_time").notNullable();
        table.string("tel").notNullable();
        table.string("full_address").notNullable();
        table.string("remarks").nullable();
        table.enu('status',["w_pickup","w_service","w_delivery","complete"]).notNullable();
        
        table.text("customer_id").unsigned();
        table.foreign("customer_id").references("users.id");

        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at")
        
    })

    await knex.schema.createTable("languague",(table)=>{
        table.increments("id");
        table.enu('type',["page","header","footer","order_form","portal"]).notNullable();
        table.text("cn").notNullable();
        table.text("eng").notNullable();
    })
    await knex.schema.createTable("languague_portal",(table)=>{
        table.increments("id");
        table.text("cn").notNullable();
        table.text("eng").notNullable();
    })
    await knex.schema.createTable("editor",(table)=>{
        table.increments("id");
        table.string('editor_type').notNullable();
        table.text("blocks").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("editor")
    await knex.schema.dropTable("languague_portal")
    await knex.schema.dropTable("languague")
    await knex.schema.dropTable("orders")
    await knex.schema.dropTable("staff_meta")
    await knex.schema.dropTable("customer_meta")
    await knex.schema.dropTable("users")
    
}


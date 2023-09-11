create table tbl_user(
	id serial not null primary key,
	username varchar(50) not null,
	email varchar(100) not null unique,
	password varchar(250) not null,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table tbl_session(
	id uuid not null primary key,
	user_id int not null,
	created_at timestamptz not null default now(),
	foreign key (user_id) references tbl_user(id)
);


create table tbl_product(
	id uuid not null primary key,
	description varchar(100),
	name varchar(100) not null,
	image varchar(100),
	price numeric(12,2) not null,
	quantity int not null check(quantity > 0),
	created_at timestamptz not null default now(),
	updated_at timestamptz default now()
);

create table tbl_cart(
	id serial primary key
	user_id int not null,
	product_id uuid not null,
	quantity int not null check(quantity > 0),
	created_at timestamptz not null default now(),
	updated_at timestamptz default now(),
	foreign key (user_id) references tbl_user(id),
	foreign key (product_id) references tbl_product(id)
);

create table tbl_logs(
	id serial not null primary key,
	request text,
	path text,
	status_code int,
	method char(6),
	response_time float,
	response text,
	created_at timestamptz not null
);

create table tbl_address(
	id serial primary key,
	user_id int not null,
	cep varchar not null,
	public_place varchar,
	complement varchar,
	neighborhood varchar not null,
	city varchar not null,
	uf varchar(2) not null,
	created_at timestamptz not null default now(),
	updated_at timestamptz default now(),
	foreign key (user_id) references tbl_user(id)
);
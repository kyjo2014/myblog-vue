const ARTICLE = '\
    create table article ( \
	id int primary key not null auto_increment, \
    title text not null,\
    content text not null,\
    timestamp  char(30),\
);\
'


module.exports = ARTICLE
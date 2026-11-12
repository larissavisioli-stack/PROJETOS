create schema ClinicaVetAPI;

create table  ClinicaVetAPI.atendimentos(
id serial primary key,
nome_paciente VARCHAR not null ,
raca VARCHAR not null,
idade INTEGER not null, 
tutor VARCHAR not NULL,
diaAtendimento DATE not null ,
valorGasto DECIMAL not NULL
);

insert into ClinicaVetAPI.atendimentos (nome_paciente, raca, idade, tutor, diaAtendimento, valorgasto)
values 
 ('Mel', 'Shih-tzu', 4, 'Mariana Costa', '2026-09-01', 180),
 ('Thor', 'Golden Retriever', 8, 'Rafael Lima', '2026-09-02', 320)

 select * from ClinicaVetAPI.atendimentos;
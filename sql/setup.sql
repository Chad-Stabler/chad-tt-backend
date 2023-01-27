DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_clips CASCADE;
DROP TABLE IF EXISTS user_comments CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS community_feed CASCADE;
DROP TABLE IF EXISTS followers CASCADE;



 CREATE TABLE users (
    id bigint generated always as identity primary key,
    GamerTag varchar not null,
    email varchar not null,
    password_hash varchar not null,
    bio varchar,
    platforms varchar,
    avatar_png varchar,
    channelLinks varchar
);

CREATE TABLE user_clips (
    id bigint generated always as identity primary key,
    clip_link varchar not null,
    users_id bigint not null,
    o_site varchar not null,
    created_at  timestamptz not null default now(),
    description varchar,
    title varchar not null,
    foreign key (users_id) references users(id)
);

CREATE TABLE votes (
    id bigint generated always as identity primary key,
    vote_up boolean,
    clip_id bigint not null,
    voter_id bigint not null,
    foreign key (clip_id) references user_clips(id),
    foreign key (voter_id) references users(id)
);

CREATE TABLE comments (
    id bigint generated always as identity primary key,
    commenter_id bigint not null,
    clip_id bigint not null,
    details varchar not null,
    created_at  timestamptz not null default now(),
    foreign key (clip_id) references user_clips(id),
    foreign key (commenter_id) references users(id)
);

CREATE TABLE community_feed (
    id bigint generated always as identity,
    clip_id bigint not null,
    users_id bigint not null,
    foreign key (clip_id) references user_clips(id)
);

CREATE TABLE followers (
    id bigint generated always as identity,
    users_id bigint not null,
    follower_id bigint not null,
    followed boolean
);

insert into users (GamerTag, email, password_hash, bio, platforms, channelLinks) values
('CheatcodeChad', 'stablerpsn@gmail.com', '$2b$10$uJutybBq9l/Hwk81Ourcm.sRgBUqPOthHNek8cO7x2wWAf5Sjz9Ie', 
'Developer of Twitch Tok, absolute legend, can scramble under pressure so effectively I look like Neo from The Matrix',
'Playstation, PC', 'https://www.youtube.com/channel/UCyS4i5WTxl16KPJRNl3i0jg, https://www.twitch.tv/thegoodmansinner'),
('LEINADDROFNATS', 'stanman@gmail.com', '$2b$10$LVjRfZEU00gO.pzF8A2nE.vH/j6RgVJ3b2/unbauuVIDvHq2IA4Eq', 
'Developer of Twitch Tok, the goat. i dont know you thats my pocket watch',
'Playstation, PC, xbox360', 'https://www.youtube.com/watch?v=Ws2XeyuAg6s, https://www.youtube.com/watch?v=XTM7aI-CFC0');



insert into user_clips (clip_link, users_id, o_site, title) values
('NKoVRXKv4rM', 1, 'youtube', 'Rocket League clip'),
('1puKDTa5kL8', 1, 'youtube', 'Tossing someone into the pool'),
('EDUQy8ZpaGU', 1, 'youtube', 'Oh wait does someone else wanna hold the bridge?'),
('y0WVN-d8l5c', 1, 'youtube', 'I`m blind'),
('M7xQ0QXotEg', 1, 'youtube', 'Double kill'),
('hu9y_EL5EJw', 1, 'youtube', 'Kali ace'),
('USMrVs-gYlA', 1, 'youtube', 'Wall bang headshot'),
('6R1rXlnTXjs', 1, 'youtube', 'Respect the square'),
('KfiZL8SSjf4', 1, 'youtube', 'I don`t even know'),
('zw_R_-WYDns', 1, 'youtube', 'Double no scope'),
('jZsJssw5zso', 1, 'youtube', 'Tappy tap'),
('Ws2XeyuAg6s', 2, 'youtube', 'AT4 HITs'),
('xODcaE-Vr-I', 2, 'youtube', 'killed by my own guy');


insert into comments (details, clip_id, commenter_id) values 
('this game is freaking sweet', 1, 2);


insert into votes (vote_up, voter_id, clip_id) values
(true, 1, 1),
(false, 2, 1),
(false, 2, 2),
(true, 2, 2);

-- insert into user_clips (vote_id, users_id) values
-- (1, 1),
-- (1, 2);


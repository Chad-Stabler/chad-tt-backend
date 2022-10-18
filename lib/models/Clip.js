const pool = require('../utils/pool');

module.exports = class Clip {
  id;
  clip_link;
  users_id;
  o_site;
  created_at;
  description;
  title;

  constructor(row) {
    this.id = row.id;
    this.clip_link = row.clip_link;
    this.users_id = row.users_id;
    this.o_site = row.o_site;
    this.created_at = row.created_at;
    this.title = row.title;
    this.description = row.description;
  }

  static async getClipsById(id) {
    const { rows } = await pool.query(`
      select * from user_clips where users_id=$1
    `, [id]);

    return rows.map(clip => new Clip(clip));
  }

  static async getAllClips() {
    const { rows } = await pool.query('select * from user_clips');

    return rows.map(row => new Clip(row));
  }

  static async insertClip({ title, description, o_site, clip_link }, id) {
    const { rows } = await pool.query(`
    insert into user_clips (users_id, description, title, o_site, clip_link) values ($1, $2, $3, $4, $5)
    returning *
    `, [id, description, title, o_site, clip_link]);

    return new Clip(rows[0]);
  }

  static async delById(id) {
    const { rows } = await pool.query(`
    delete from user_clips where id = $1 returning *
    `, [id]);

    return new Clip(rows[0]);
  }

  static async getClipById(id) {
    const { rows } = await pool.query(`
    select * from user_clips where id = $1
    `, [id]);

    return new Clip(rows[0]);
  }

  static async updateById(id, updatedClip) {
    const clip = Clip.getClipById(id);
    if (!clip) return null;
    const { title, description } = { ...clip, ...updatedClip };
    const { rows } = await pool.query(`
    update user_clips 
    set title = $1, description = $2 where id = $3
    returning *
    `, [title, description, id]);

    return new Clip(rows[0]);
  }

};
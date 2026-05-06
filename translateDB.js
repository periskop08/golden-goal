const { sql } = require('@vercel/postgres');

const translations = {
  'Meksika': 'Mexico',
  'Güney Afrika': 'South Africa',
  'Güney Kore': 'South Korea',
  'Çekya': 'Czechia',
  'Kanada': 'Canada',
  'Bosna Hersek': 'Bosnia and Herzegovina',
  'Katar': 'Qatar',
  'İsviçre': 'Switzerland',
  'Brezilya': 'Brazil',
  'Fas': 'Morocco',
  'Haiti': 'Haiti',
  'İskoçya': 'Scotland',
  'ABD': 'USA',
  'Paraguay': 'Paraguay',
  'Avustralya': 'Australia',
  'Türkiye': 'Turkey',
  'Almanya': 'Germany',
  'Curaçao': 'Curacao',
  'Fildişi Sahili': 'Ivory Coast',
  'Ekvador': 'Ecuador',
  'Hollanda': 'Netherlands',
  'Japonya': 'Japan',
  'İsveç': 'Sweden',
  'Tunus': 'Tunisia',
  'Belçika': 'Belgium',
  'Mısır': 'Egypt',
  'İran': 'Iran',
  'Yeni Zelanda': 'New Zealand',
  'İspanya': 'Spain',
  'Cape Verde': 'Cape Verde',
  'Suudi Arabistan': 'Saudi Arabia',
  'Uruguay': 'Uruguay',
  'Fransa': 'France',
  'Senegal': 'Senegal',
  'Irak': 'Iraq',
  'Norveç': 'Norway',
  'Arjantin': 'Argentina',
  'Cezayir': 'Algeria',
  'Avusturya': 'Austria',
  'Ürdün': 'Jordan',
  'Portekiz': 'Portugal',
  'DR Kongo': 'DR Congo',
  'Özbekistan': 'Uzbekistan',
  'Kolombiya': 'Colombia',
  'İngiltere': 'England',
  'Hırvatistan': 'Croatia',
  'Gana': 'Ghana',
  'Panama': 'Panama'
};

async function run() {
    try {
        for (const [tr, en] of Object.entries(translations)) {
            // Update markets teamA
            await sql`UPDATE markets SET "teamA" = ${en} WHERE "teamA" = ${tr}`;
            // Update markets teamB
            await sql`UPDATE markets SET "teamB" = ${en} WHERE "teamB" = ${tr}`;
            
            // Update bets prediction (since predictions are strings of team names)
            await sql`UPDATE bets SET prediction = ${en} WHERE prediction = ${tr}`;
            
            // Also need to handle "Team & Draw" predictions in bets table
            // For example: "Türkiye & Berabere" needs to become "Turkey & Draw"
            await sql`UPDATE bets SET prediction = ${en || ' & Draw'} WHERE prediction = ${tr + ' & Berabere'}`;
        }
        
        // Also update any standalone "Berabere" to "Draw" in bets table
        await sql`UPDATE bets SET prediction = 'Draw' WHERE prediction = 'Berabere'`;
        
        // Also "Gol Olmaz" to "No Goal"
        await sql`UPDATE bets SET prediction = 'No Goal' WHERE prediction = 'Gol Olmaz'`;
        
        console.log("Database translated successfully.");
    } catch(e) {
        console.error(e);
    }
}
run();

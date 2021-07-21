import React from 'react';
import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

const saint = {
  id: '1',
  name: 'Kosmas Aitolos',
  title: 'Saint',
  born: '1714',
  died: '1779',
  isBC: false,
  feastDay: 'August 24',
  life: 'The New Hieromartyr Cosmas, Equal of the Apostles, in the world Constas, was a native of Aitolia. He studied at first under the guidance of the archdeacon Ananias Dervisanos, and afterwards continued his education on Mount Athos, at the Vatopedi school renowned for teachers such as Nicholas Tzartzoulios (from Metsovo) and Eugenius Voulgaris (afterwards in the years 1775-1779 the archbishop of Ekaterinoslav and the Chersonessus). Remaining on Athos at the Philotheou monastery to devote himself to spiritual labors, he was tonsured a monk with the name Cosmas, and later was ordained hieromonk. The desire to benefit his fellow Christians, to guide them upon the way of salvation and strengthen their faith, impelled Saint Cosmas to seek the blessing of his spiritual fathers and go to Constantinople. There he mastered the art of rhetoric and, having received a written permit of Patriarch Seraphim II (and later from his successor Sophronius) to preach the Holy Gospel. So the saint began to proclaim the Gospel at first in the churches of Constantinople and the surrounding villages, then in the Danube regions, in Thessalonica, in Verroia, in Macedonia, Chimaera, Akarnania, Aitolia, on the islands of Saint Maura, Kephalonia and other places. His preaching, filled with the grace of the Holy Spirit, was simple, calm, and gentle. It brought Christians great spiritual benefit. The Lord Himself assisted him and confirmed his words with signs and miracles, just as He had confirmed the preaching of the Apostles. Preaching in the remote areas of Albania, where Christian piety had almost disappeared among the rough and coarse people entrenched in sin, Saint Cosmas led them to sincere repentance and improvement with the Word of God. Under his guidance, church schools were opened in the towns and villages. The rich offered their money for the betterment of the churches, for the purchase of Holy Books (which the saint distributed to the literate), veils (which he gave women, admonishing them to come to church with covered heads),for prayer ropes and crosses (which he distributed to the common folk), and for baptismal fonts so that children could be baptized in the proper manner. Since the churches could not accommodate everyone wanting to hear the wise preacher, Saint Cosmas with forty or fifty priests served the Vigil in the fields, and in city squares, where thousands of people prayed for the living and for the dead, and were edified by his preaching. Everywhere that Saint Cosmas halted and preached, the grateful listeners set up a large wooden cross, which remained thereafter in memory of this. The apostolic service of Saint Cosmas was brought to a close by his martyric death in the year 1779. At 65 years of age, he was seized by the Turks and strangled. His body was thrown into a river, and after three days, was found by the priest Mark and buried near the village of Kolikontasi at the monastery of the Entrance into the Temple of the Most Holy Theotokos. Afterwards, part of his relics were transferred to various places as a blessing. He was glorified by the Ecumenical Patriarchate in 1961.',
  createdAt: '2021-07-21T10:45:46.481Z',
  modifiedAt: '2021-07-21T10:45:46.481Z',
  isDeleted: false,
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Synaxis Holy Quotes App</title>
        <meta
          name='description'
          content='An App For Eastern Orthodox Christians'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <main>
        <h1>The Synaxis Holy Quotes App</h1>
        <p>An App For Eastern Orthodox Christians</p>

        <div>
          <h2>
            {saint.title} {saint.name}
          </h2>
          <p>Feast: {saint.feastDay}</p>
          <img src='/images/services/allSaints.jpg' alt={`${saint.name}`} />
          <p>{saint.life}</p>
        </div>
      </main>
    </div>
  );
}

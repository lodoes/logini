// pages/maps.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Head from 'next/head'





const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const ResidencesMapPage = () => {
  const [residences, setResidences] = useState([]);
  const router = useRouter();
  const { disponibilite, search, departement } = router.query;

  useEffect(() => {
    const fetchResidences = async () => {
      let query = supabase.from('residences').select('*');
      if (disponibilite) query = query.eq('disponibilite', disponibilite);
      if (departement) query = query.ilike('departement', `%${departement}%`);
      if (search) query = query.or(`nom.ilike.%${search}%,type.ilike.%${search}%,ville.ilike.%${search}%`);

      const { data, error } = await query;
      if (error) {
        console.error('Erreur lors de la récupération des résidences:', error);
      } else {
        setResidences(data);
      }
    };

    fetchResidences();
  }, [disponibilite, search, departement]);

  return (
    <>
    <Navbar />
    <div style={{ height: "100vh", width: "100%" }}>
      <Head>
        <title>Logini - Carte des residences</title>
      </Head>
      {residences.length > 0 ? (
        <LeafletMap residences={residences} />
      ) : (
        <p>Chargement des résidences...</p>
      )}
    </div>
    </>
  );
};

export default ResidencesMapPage;

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import InteractiveEffects from '@/components/InteractiveEffects';

export default function PublicLayout({ children }) {
  return (
    <>
      <ScrollReveal />
      <InteractiveEffects />
      <Header />
      {children}
      <Footer />
    </>
  );
}


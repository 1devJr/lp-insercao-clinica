export default function SectionFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#262523] py-20'>
      <div className='container mx-auto px-4'>
        <p className='text-center text-[#fcf8f0] text-sm'>
          © {currentYear} Clinica Menote Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

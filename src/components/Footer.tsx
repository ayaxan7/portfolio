export default function Footer() {
  return (
    <footer className="bg-black text-gray-500 py-6">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Syed Mohammad Ayaan. All rights reserved.</p>
      </div>
    </footer>
  );
}

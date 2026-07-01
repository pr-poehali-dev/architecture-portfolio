import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const IMG_RESIDENTIAL = 'https://cdn.poehali.dev/projects/6455e36c-fb7d-4e9f-aea7-d78539ce348c/files/89919f47-3e94-42ea-bd82-e8a5692eea25.jpg';
const IMG_INTERIOR = 'https://cdn.poehali.dev/projects/6455e36c-fb7d-4e9f-aea7-d78539ce348c/files/253b008a-0a0d-47ee-b7af-fd46c57e9c71.jpg';
const IMG_COMMERCIAL = 'https://cdn.poehali.dev/projects/6455e36c-fb7d-4e9f-aea7-d78539ce348c/files/597a7fcc-7e35-4ba8-adc9-7b6706aee493.jpg';

type Category = 'Все' | 'Жильё' | 'Коммерция' | 'Интерьеры';

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  category: Exclude<Category, 'Все'>;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: 'Дом у леса', location: 'Московская область', year: '2024', category: 'Жильё', image: IMG_RESIDENTIAL },
  { id: 2, title: 'Тихая гостиная', location: 'Санкт-Петербург', year: '2023', category: 'Интерьеры', image: IMG_INTERIOR },
  { id: 3, title: 'Бизнес-центр Ось', location: 'Москва', year: '2024', category: 'Коммерция', image: IMG_COMMERCIAL },
  { id: 4, title: 'Резиденция Свет', location: 'Сочи', year: '2022', category: 'Жильё', image: IMG_RESIDENTIAL },
  { id: 5, title: 'Пространство Норма', location: 'Казань', year: '2023', category: 'Интерьеры', image: IMG_INTERIOR },
  { id: 6, title: 'Павильон Грань', location: 'Екатеринбург', year: '2024', category: 'Коммерция', image: IMG_COMMERCIAL },
];

const services = [
  { num: '01', title: 'Архитектурное проектирование', text: 'Концепция, рабочая документация и авторский надзор — от эскиза до сдачи объекта.' },
  { num: '02', title: 'Дизайн интерьеров', text: 'Целостные пространства, где свет, материал и функция подчинены единой идее.' },
  { num: '03', title: 'Градостроительство', text: 'Мастер-планы и общественные пространства с уважением к контексту и человеку.' },
  { num: '04', title: 'Консалтинг', text: 'Экспертиза участка, техническое задание и стратегия развития проекта.' },
];

const team = [
  { name: 'Анна Ковалёва', role: 'Главный архитектор' },
  { name: 'Дмитрий Орлов', role: 'Партнёр, руководитель' },
  { name: 'Мария Соколова', role: 'Дизайнер интерьеров' },
  { name: 'Игорь Белов', role: 'Ведущий инженер' },
];

const posts = [
  { date: '12.06.2026', title: 'Свет как строительный материал', tag: 'Философия' },
  { date: '28.05.2026', title: 'Бетон и тепло: работа с фактурой', tag: 'Материалы' },
  { date: '15.04.2026', title: 'Минимализм не значит пустота', tag: 'Заметки' },
];

const navLinks = [
  { label: 'О бюро', id: 'about' },
  { label: 'Услуги', id: 'services' },
  { label: 'Проекты', id: 'projects' },
  { label: 'Команда', id: 'team' },
  { label: 'Блог', id: 'blog' },
  { label: 'Контакты', id: 'contacts' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const Index = () => {
  const [filter, setFilter] = useState<Category>('Все');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories: Category[] = ['Все', 'Жильё', 'Коммерция', 'Интерьеры'];
  const filtered = filter === 'Все' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-display text-2xl tracking-[0.25em] font-medium">
            ТАНДЕМ
          </button>
          <nav className="hidden md:flex items-center gap-9 text-sm">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="relative group tracking-wide">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-background border-t border-border mt-4 px-6 py-6 flex flex-col gap-5 animate-fade-in">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-lg font-display">
                {l.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <img
          src={IMG_RESIDENTIAL}
          alt="Архитектура"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 md:pb-28">
          <p className="text-white/80 text-sm tracking-mega uppercase mb-6 animate-fade-in">
            Архитектурное бюро · с 2009
          </p>
          <h1
            className="font-display text-white text-[15vw] leading-[0.85] md:text-[9rem] font-light animate-fade-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Пространство<br />тишины
          </h1>
          <p
            className="text-white/85 max-w-md mt-8 text-lg font-light animate-fade-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Проектируем здания и интерьеры, в которых свет, материал и форма живут в согласии.
          </p>
        </div>
        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
        >
          <Icon name="ChevronDown" size={30} className="animate-bounce" />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4 reveal">
            <span className="text-accent text-sm tracking-mega uppercase">О бюро</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="reveal font-display text-4xl md:text-6xl font-light leading-[1.05] mb-10">
              Мы верим, что хорошая архитектура остаётся незаметной, но меняет ощущение жизни.
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 text-muted-foreground reveal" style={{ animationDelay: '0.15s' }}>
              <p>
                За пятнадцать лет мы спроектировали более сотни объектов — от частных домов до
                общественных пространств. Каждый проект начинается с вопроса «как здесь будет
                жить человек».
              </p>
              <p>
                Наш метод — сдержанность. Мы убираем лишнее, пока не останется только суть:
                пропорция, свет, честный материал и точная деталь.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-16 reveal" style={{ animationDelay: '0.3s' }}>
              {[
                ['120+', 'Проектов'],
                ['15', 'Лет опыта'],
                ['9', 'Наград'],
              ].map(([n, l]) => (
                <div key={l} className="border-t border-border pt-5">
                  <div className="font-display text-5xl md:text-6xl font-light">{n}</div>
                  <div className="text-sm text-muted-foreground mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-primary text-primary-foreground py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4 reveal">
              <span className="text-accent text-sm tracking-mega uppercase">Услуги</span>
            </div>
            <h2 className="md:col-span-8 reveal font-display text-4xl md:text-6xl font-light">
              Что мы делаем
            </h2>
          </div>
          <div className="grid md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.num}
                className="reveal border-t border-primary-foreground/20 py-10 md:py-12 md:px-8 group hover:bg-primary-foreground/5 transition-colors duration-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-2xl text-accent">{s.num}</span>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-light mb-4">{s.title}</h3>
                    <p className="text-primary-foreground/60 max-w-md">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="reveal text-accent text-sm tracking-mega uppercase block mb-5">Портфолио</span>
            <h2 className="reveal font-display text-4xl md:text-6xl font-light">Избранные проекты</h2>
          </div>
          <div className="flex flex-wrap gap-3 reveal">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 text-sm border transition-all duration-300 ${
                  filter === c
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-20' : ''}`}
            >
              <div className="overflow-hidden bg-muted aspect-[4/5]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="img-zoom w-full h-full object-cover"
                />
              </div>
              <div className="flex items-baseline justify-between mt-6">
                <h3 className="font-display text-3xl md:text-4xl font-light">{p.title}</h3>
                <span className="text-sm text-muted-foreground">{p.year}</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-muted-foreground text-sm">
                <span>{p.category}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span>{p.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="bg-secondary py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4 reveal">
              <span className="text-accent text-sm tracking-mega uppercase">Команда</span>
            </div>
            <h2 className="md:col-span-8 reveal font-display text-4xl md:text-6xl font-light">
              Люди за проектами
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {team.map((m, i) => (
              <div
                key={m.name}
                className="reveal bg-secondary p-8 md:p-10 group hover:bg-background transition-colors duration-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-square bg-muted mb-6 flex items-center justify-center">
                  <span className="font-display text-6xl text-muted-foreground/40">
                    {m.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-light">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4 reveal">
            <span className="text-accent text-sm tracking-mega uppercase">Блог</span>
          </div>
          <h2 className="md:col-span-8 reveal font-display text-4xl md:text-6xl font-light">Заметки бюро</h2>
        </div>
        <div>
          {posts.map((post, i) => (
            <div
              key={post.title}
              className="reveal group border-t border-border py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-10 cursor-pointer hover:px-4 transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-sm text-muted-foreground w-28">{post.date}</span>
              <span className="text-xs uppercase tracking-widest text-accent w-28">{post.tag}</span>
              <h3 className="font-display text-2xl md:text-3xl font-light flex-1">{post.title}</h3>
              <Icon
                name="ArrowUpRight"
                size={26}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <section id="contacts" className="bg-primary text-primary-foreground pt-28 md:pt-40 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 pb-24 border-b border-primary-foreground/15">
            <div className="md:col-span-6 reveal">
              <span className="text-accent text-sm tracking-mega uppercase block mb-6">Контакты</span>
              <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.95]">
                Обсудим<br />ваш проект
              </h2>
            </div>
            <div className="md:col-span-6 flex flex-col justify-end gap-8 reveal" style={{ animationDelay: '0.15s' }}>
              <div>
                <p className="text-primary-foreground/50 text-sm mb-1">Почта</p>
                <a href="mailto:hello@tandem.ru" className="font-display text-2xl md:text-3xl font-light hover:text-accent transition-colors">
                  hello@tandem.ru
                </a>
              </div>
              <div>
                <p className="text-primary-foreground/50 text-sm mb-1">Телефон</p>
                <a href="tel:+74951234567" className="font-display text-2xl md:text-3xl font-light hover:text-accent transition-colors">
                  +7 495 123 45 67
                </a>
              </div>
              <div>
                <p className="text-primary-foreground/50 text-sm mb-1">Студия</p>
                <p className="font-display text-2xl md:text-3xl font-light">Москва, Хлебный пер. 4</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-sm text-primary-foreground/50">
            <span className="font-display text-xl tracking-[0.25em] text-primary-foreground">ТАНДЕМ</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary-foreground transition-colors">Behance</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Telegram</a>
            </div>
            <span>© 2026 Бюро ТАНДЕМ</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
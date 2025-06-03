"use client";

import { useState, useTransition } from "react";
import { Column, Flex, Text, Button, Input, Textarea, Card, Heading } from "@/once-ui/components";
import { person, home, about, work, blog, gallery, social } from "@/app/resources/content";
import { style, effects, display } from "@/app/resources/config";
import React, { ChangeEvent } from "react";

// --- Авторизация ---
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "090821") {
      setIsAuth(true);
      setError(null);
    } else {
      setError("Неверный пароль");
    }
  };

  if (!isAuth) {
    return (
      <Flex fillWidth fillHeight background="surface" horizontal="center" vertical="center" style={{ minHeight: "100vh" }}>
        <Card padding="40" radius="xl" shadow="xl" background="background">
          <Column gap="24" minWidth={24} maxWidth={32}>
            <Heading align="center" variant="display-strong-m">Вход в панель управления</Heading>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Column gap="16">
                <Input
                  id="admin-password"
                  label="Пароль"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={!!error}
                  errorMessage={error}
                  autoFocus
                />
                <Button type="submit" variant="primary" fillWidth>Войти</Button>
              </Column>
            </form>
          </Column>
        </Card>
      </Flex>
    );
  }
  return <>{children}</>;
}

const sections = [
  { key: "home", label: "Главная" },
  { key: "about", label: "О себе" },
  { key: "work", label: "Проекты" },
  { key: "blog", label: "Блог" },
  { key: "gallery", label: "Галерея" },
  { key: "footer", label: "Футер" },
  { key: "social", label: "Соцсети" },
  { key: "settings", label: "Настройки" },
];

function HomeSection() {
  const [title, setTitle] = useState(home.title);
  const [description, setDescription] = useState(home.description);
  const [headline, setHeadline] = useState(typeof home.headline === "string" ? home.headline : "");
  const [image, setImage] = useState(home.image);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person,
            home: { ...home, title, description, headline, image },
            about,
            work,
            blog,
            gallery,
            social,
          }),
        });
        if (res.ok) {
          setMessage("Изменения сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Заголовок</Text>
      <Input id="home-title" label="Заголовок" value={title} onChange={e => setTitle(e.target.value)} />
      <Text variant="heading-strong-m">Описание</Text>
      <Textarea id="home-description" label="Описание" value={description} onChange={e => setDescription(e.target.value)} lines={3} />
      <Text variant="heading-strong-m">Подзаголовок</Text>
      <Textarea id="home-headline" label="Подзаголовок" value={headline} onChange={e => setHeadline(e.target.value)} lines={2} />
      <Text variant="heading-strong-m">Изображение</Text>
      <img src={image} alt="Главная" style={{ maxWidth: 320 }} />
      <Input id="home-image" label="Путь к изображению" type="text" value={image} onChange={e => setImage(e.target.value)} />
      <ImageUpload onUpload={url => setImage(url)} />
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function AboutSection() {
  const [firstName, setFirstName] = useState(person.firstName);
  const [lastName, setLastName] = useState(person.lastName);
  const [role, setRole] = useState(person.role);
  const [location, setLocation] = useState(person.location);
  const [avatar, setAvatar] = useState(person.avatar);
  const [aboutText, setAboutText] = useState(
    typeof about.intro?.description === "string" ? about.intro.description : ""
  );
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const newPerson = { ...person, firstName, lastName, role, location, avatar };
        const newAbout = {
          ...about,
          intro: { ...about.intro, description: aboutText },
        };
        const res = await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person: newPerson,
            home,
            about: newAbout,
            work,
            blog,
            gallery,
            social,
          }),
        });
        if (res.ok) {
          setMessage("Изменения сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Имя</Text>
      <Input id="about-firstname" label="Имя" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <Text variant="heading-strong-m">Фамилия</Text>
      <Input id="about-lastname" label="Фамилия" value={lastName} onChange={e => setLastName(e.target.value)} />
      <Text variant="heading-strong-m">Роль</Text>
      <Input id="about-role" label="Роль" value={role} onChange={e => setRole(e.target.value)} />
      <Text variant="heading-strong-m">Локация</Text>
      <Input id="about-location" label="Локация" value={location} onChange={e => setLocation(e.target.value)} />
      <Text variant="heading-strong-m">Аватар</Text>
      <img src={avatar} alt="Аватар" style={{ maxWidth: 120, borderRadius: 12 }} />
      <Input id="about-avatar" label="Путь к аватару" value={avatar} onChange={e => setAvatar(e.target.value)} />
      <ImageUpload onUpload={url => setAvatar(url)} />
      <Text variant="heading-strong-m">О себе</Text>
      <Textarea id="about-text" label="О себе" value={aboutText} onChange={e => setAboutText(e.target.value)} lines={4} />
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function WorkSection() {
  const [title, setTitle] = useState(work.title);
  const [description, setDescription] = useState(work.description);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const newWork = { ...work, title, description };
        const res = await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person,
            home,
            about,
            work: newWork,
            blog,
            gallery,
            social,
          }),
        });
        if (res.ok) {
          setMessage("Изменения сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Заголовок</Text>
      <Input id="work-title" label="Заголовок" value={title} onChange={e => setTitle(e.target.value)} />
      <Text variant="heading-strong-m">Описание</Text>
      <Textarea id="work-description" label="Описание" value={description} onChange={e => setDescription(e.target.value)} lines={3} />
      {/* TODO: Список проектов и их редактирование */}
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function BlogSection() {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const newBlog = { ...blog, title, description };
        const res = await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person,
            home,
            about,
            work,
            blog: newBlog,
            gallery,
            social,
          }),
        });
        if (res.ok) {
          setMessage("Изменения сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Заголовок</Text>
      <Input id="blog-title" label="Заголовок" value={title} onChange={e => setTitle(e.target.value)} />
      <Text variant="heading-strong-m">Описание</Text>
      <Textarea id="blog-description" label="Описание" value={description} onChange={e => setDescription(e.target.value)} lines={3} />
      {/* TODO: Управление постами блога (mdx-файлы) */}
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function GallerySection() {
  const [images, setImages] = useState(gallery.images || []);
  const [newImage, setNewImage] = useState({ src: '', alt: '', orientation: 'horizontal' });
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleAddImage = () => {
    if (newImage.src) {
      setImages([...images, newImage]);
      setNewImage({ src: '', alt: '', orientation: 'horizontal' });
    }
  };

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const newGallery = { ...gallery, images };
        const res = await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person,
            home,
            about,
            work,
            blog,
            gallery: newGallery,
            social,
          }),
        });
        if (res.ok) {
          setMessage("Изменения сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  const handleRemove = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <Column gap="16" style={{ maxWidth: 700 }}>
      <Text variant="heading-strong-m">Галерея</Text>
      <Flex gap="8" wrap>
        {images.map((img, i) => (
          <Flex key={i} direction="column" align="center">
            <img src={img.src} alt={img.alt} style={{ maxWidth: 120, borderRadius: 8 }} />
            <Button size="s" variant="tertiary" onClick={() => handleRemove(i)} style={{ marginTop: 4 }}>Удалить</Button>
          </Flex>
        ))}
      </Flex>
      <Text variant="heading-strong-m">Добавить изображение</Text>
      <Input id="gallery-src" label="Путь" value={newImage.src} onChange={e => setNewImage({ ...newImage, src: e.target.value })} />
      <Input id="gallery-alt" label="Alt" value={newImage.alt} onChange={e => setNewImage({ ...newImage, alt: e.target.value })} />
      <Input id="gallery-orientation" label="Ориентация (horizontal/vertical)" value={newImage.orientation} onChange={e => setNewImage({ ...newImage, orientation: e.target.value })} />
      <ImageUpload onUpload={url => setNewImage({ ...newImage, src: url })} />
      <Button variant="secondary" onClick={handleAddImage}>Добавить</Button>
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function SocialSection() {
  const [items, setItems] = useState(social);
  const [newItem, setNewItem] = useState({ name: '', icon: '', link: '' });
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleAdd = () => {
    if (newItem.name && newItem.link) {
      setItems([...items, newItem]);
      setNewItem({ name: '', icon: '', link: '' });
    }
  };

  const handleRemove = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person,
            home,
            about,
            work,
            blog,
            gallery,
            social: items,
          }),
        });
        if (res.ok) {
          setMessage("Изменения сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Социальные сети</Text>
      {items.map((s, i) => (
        <Flex key={i} gap="8" vertical="center">
          <Text>{s.name}</Text>
          <Text>{s.link}</Text>
          <Button size="s" variant="tertiary" onClick={() => handleRemove(i)}>Удалить</Button>
        </Flex>
      ))}
      <Text variant="heading-strong-m">Добавить</Text>
      <Input id="social-name" label="Название" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
      <Input id="social-icon" label="Иконка" value={newItem.icon} onChange={e => setNewItem({ ...newItem, icon: e.target.value })} />
      <Input id="social-link" label="Ссылка" value={newItem.link} onChange={e => setNewItem({ ...newItem, link: e.target.value })} />
      <Button variant="secondary" onClick={handleAdd}>Добавить</Button>
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function SettingsSection() {
  const [theme, setTheme] = useState(style.theme);
  const [brand, setBrand] = useState(style.brand);
  const [accent, setAccent] = useState(style.accent);
  const [effectsState, setEffectsState] = useState(effects);
  const [displayState, setDisplayState] = useState(display);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/save-config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            config: {
              ...require('@/app/resources/config'),
              style: { ...style, theme, brand, accent },
              effects: effectsState,
              display: displayState,
            },
          }),
        });
        if (res.ok) {
          setMessage("Настройки сохранены!");
        } else {
          setMessage("Ошибка при сохранении");
        }
      } catch (e) {
        setMessage("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Тема</Text>
      <Input id="settings-theme" label="Тема (light/dark)" value={theme} onChange={e => setTheme(e.target.value)} />
      <Text variant="heading-strong-m">Бренд</Text>
      <Input id="settings-brand" label="Бренд" value={brand} onChange={e => setBrand(e.target.value)} />
      <Text variant="heading-strong-m">Акцент</Text>
      <Input id="settings-accent" label="Акцент" value={accent} onChange={e => setAccent(e.target.value)} />
      {/* Можно добавить больше полей для effects и display по аналогии */}
      <Button variant="primary" onClick={handleSave} style={{ marginTop: 24 }} disabled={isPending}>
        {isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
      {message && <Text variant="body-default-s">{message}</Text>}
    </Column>
  );
}

function FooterSection() {
  return (
    <Column gap="16" style={{ maxWidth: 600 }}>
      <Text variant="heading-strong-m">Футер</Text>
      <Text>Редактирование футера реализуется через глобальные настройки и соцсети.</Text>
    </Column>
  );
}

export default function EditPanel() {
  const [active, setActive] = useState("home");

  let SectionComponent = null;
  switch (active) {
    case "home":
      SectionComponent = <HomeSection />;
      break;
    case "about":
      SectionComponent = <AboutSection />;
      break;
    case "work":
      SectionComponent = <WorkSection />;
      break;
    case "blog":
      SectionComponent = <BlogSection />;
      break;
    case "gallery":
      SectionComponent = <GallerySection />;
      break;
    case "footer":
      SectionComponent = <FooterSection />;
      break;
    case "social":
      SectionComponent = <SocialSection />;
      break;
    case "settings":
      SectionComponent = <SettingsSection />;
      break;
    default:
      SectionComponent = null;
  }

  return (
    <AuthGuard>
      <Flex fillWidth style={{ minHeight: "100vh" }} background="background">
        {/* Боковое меню */}
        <Column minWidth={240} maxWidth={56} borderRight="neutral-alpha-medium" paddingY="40" paddingX="24" gap="16" background="surface" shadow="l" style={{ borderRadius: "0 2rem 2rem 0" }}>
          <Text variant="display-strong-s" align="center" style={{ letterSpacing: 1 }}>Панель управления</Text>
          {sections.map((section) => (
            <Button
              key={section.key}
              variant={active === section.key ? "primary" : "tertiary"}
              onClick={() => setActive(section.key)}
              fillWidth
              size="l"
              style={{ borderRadius: 12, fontWeight: 600, fontSize: 18 }}
            >
              {section.label}
            </Button>
          ))}
        </Column>
        {/* Контент секции */}
        <Flex flex={1} paddingY="48" paddingX="0" horizontal="center" background="background">
          <Card fillWidth maxWidth={56} minWidth={32} padding="40" radius="xl" shadow="xl" background="surface">
            <Column gap="32">
              <Text variant="display-strong-m" align="center" style={{ letterSpacing: 1 }}>{sections.find(s => s.key === active)?.label}</Text>
              {SectionComponent}
            </Column>
          </Card>
        </Flex>
      </Flex>
    </AuthGuard>
  );
}

// --- Загрузка изображений (универсальный компонент) ---
import React, { ChangeEvent } from "react";

function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          onUpload(data.url);
        } else {
          setError(data.error || "Ошибка загрузки");
        }
      } catch {
        setError("Ошибка сети");
      }
    });
  };

  return (
    <Column gap="8">
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={isPending} />
      {isPending && <Text variant="body-default-s">Загружаю...</Text>}
      {error && <Text variant="body-default-s" onBackground="danger-weak">{error}</Text>}
    </Column>
  );
}

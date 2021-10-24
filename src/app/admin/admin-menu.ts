export const menu = {
  categories: [
    {
      label: 'Conteúdo',
      items: [
        {
          label: 'Depoimentos',
          route: '/admin/depoimentos',
          icon: 'format_quote'
        },
        {
          label: 'Trilhas',
          route: '/admin/trilhas',
          icon: 'menu_book'
        },
        {
          label: 'Comentarios',
          route: '/admin/comentarios',
          icon: 'comment'
        },
        {
          label: 'Blog',
          route: '/admin/blog',
          icon: 'rss_feed'
        }
      ]
    },
    {
      label: 'Usuários',
      items: [
        {
          label: 'Mentorados',
          route: '/admin/mentorados',
          icon: 'group'
        },
        {
          label: 'Educadores',
          route: '/admin/educadores',
          icon: 'groups'
        },
        {
          label: 'Mentores',
          route: '/admin/mentores',
          icon: 'verified_user'
        }
      ]
    }
  ]
};

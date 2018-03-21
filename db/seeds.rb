Place.destroy_all
ar = [
  {
    url: 'http://tmb.nextblock.ru',
    name: 'TMB 1'
  },
  {
    url: 'http://tmb2.nextblock.ru',
    name: 'TMB 2'
  },
  {
    url: 'http://chrn.nextblock.ru',
    name: 'Черноголовка'
  }
]
ar.each do |c|
  Place.create(c)
end

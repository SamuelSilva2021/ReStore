using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initializer(StoreContext context)
        {
            if(context.Produtos.Any()) return;

            var produtos = new List<Produto>
            {
                new Produto
                {
                    Name = "Impressora Multifuncional",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/impressora.png",
                    Brand = "HP",
                    Type = "Impressoras",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Controle Xbox Razer",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/controle.png",
                    Brand = "Razer",
                    Type = "Controles",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Headset Corsair",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/headset-cosair.png",
                    Brand = "Corsair",
                    Type = "Headsets",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Headset Corsair",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/headset-cosair.png",
                    Brand = "Corsair",
                    Type = "Headsets",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Headset Asus Branco",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/headset-asus.png",
                    Brand = "Asus",
                    Type = "Headsets",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Joystick Longitech",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/joystick.png",
                    Brand = "Longitech",
                    Type = "Controles",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Monitor Asus",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/monitor.png",
                    Brand = "Asus",
                    Type = "Monitores",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Mouse longitech",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/mouse.png",
                    Brand = "Longitech",
                    Type = "Periféricos",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Teclado Apple",
                    Description =
                        "Conforto, designi e sofisticação em um só produto.",
                    Price = 19999,
                    PictureUrl = "/images/products/teclado.png",
                    Brand = "Apple",
                    Type = "Periféricos",
                    QuantityInStock = 100
                },
                new Produto
                {
                    Name = "Computador Core i7",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/computador.png",
                    Brand = "Intel",
                    Type = "Computadores",
                    QuantityInStock = 100
                }
            };

            foreach(var prod in produtos)
            {
                context.Produtos.Add(prod);
            }

            context.SaveChanges();
        }
    }
}
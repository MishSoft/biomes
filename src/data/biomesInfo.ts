export interface BiomeInfo {
  id: string;
  name: string;
  color: string;
  image?: string;
}

export const biomesInfo: BiomeInfo[] = [
  {
    id: "polar-desert",
    name: "პოლარული უდაბნო",
    color: "#A1B4B3",
    image: "/icons/mountine.svg",
  },
  {
    id: "tundra",
    name: "ტუნდრა",
    color: "#7FE2C9",
    image: "/icons/mountine.svg",
  },
  {
    id: "taiga",
    name: "ტაიგა ანუ ზომიერი სარტყლის წიწვოვანი და წვრილფოთლო",
    color: "#005048",
    image: "/icons/trees.svg",
  },
  {
    id: "nemoral-biome",
    name: "ზომიერი სარტყლის ფართოფოთლოვანი ტყეები (ნემორალური ბიომი)",
    color: "#9BDE47",
    image: "/icons/trees.svg",
  },

  {
    id: "temperate-grasslands-savannas-shrublands",
    name: "სტეპები, პრერიები და სამხრეთ ნახევარსფეროს სტეპის ანალოგები",
    color: "#F9E854",
    image: "/icons/flower.svg",
  },
  {
    id: "subtropical-hemihylea",
    name: "ნოტიო სუბტროპიკული წვიმიანი ტყეები (ჰემიჰილეა)",
    color: "#076809",
    image: "/icons/rain.svg",
  },
  {
    id: "mediterranean-forests",
    name: "ხმელთაშუაზღვისპირეთის ხეშეშფოთლოვანი მარადმწვანე ტყეები და ბუჩქნარები",
    color: "#785784",
    image: "/icons/flower.svg",
  },
  {
    id: "tropical-seasonal-forest",
    name: "მუსონური ტყეები (ტროპიკების სეზონურად მარადმწვანე ტყეები)",
    color: "#5D825A",
    image: "/icons/trees.svg",
  },

  {
    id: "deserts-xeric-shrublands",
    name: "უდაბნოები და ნახევარუდაბნოები",
    color: "#8B3C26",
    image: "/icons/sun.svg",
  },
  {
    id: "tropical-savannas",
    name: "ტროპიკული სავანები",
    color: "#CEB73E",
    image: "/icons/flower.svg",
  },
  {
    id: "hylea",
    name: "მარადმწვანე ეკვატორული და ტროპიკული წვიმიანი ტყებია (ჰილეა)",
    color: "#024902",
    image: "/icons/trees.svg",
  },
  {
    id: "hemi-hylea",
    name: "ზომიერი სარტყლის სუბანტარქტიკული ჰემილეია",
    color: "#07E301",
    image: "/icons/trees.svg",
  },
  {
    id: "orobiome",
    name: "მაღალმთიანი ბიომი ანუ ორობიომი",
    color: "#247A7C",
    image: "/icons/mountine.svg",
  },
];

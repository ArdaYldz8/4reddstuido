"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import WhatsApp from "@mui/icons-material/WhatsApp";
import EmailRounded from "@mui/icons-material/EmailRounded";
import Instagram from "@mui/icons-material/Instagram";
import {
  categoryLabels,
  pricingItems,
  type PricingCategory,
} from "@/data/pricing";
import { reddTheme } from "@/styles/muiTheme";

const categoryOrder: PricingCategory[] = [
  "studio",
  "lighting",
  "audio",
  "camera",
  "modifiers",
  "backdrop",
  "included",
];

const studioPackages = pricingItems.filter((item) => item.category === "studio");
const includedItems = pricingItems.filter((item) => item.category === "included");
const rentalEquipmentGroups = categoryOrder
  .filter((category) => category !== "studio" && category !== "included")
  .map((category) => ({
    category,
    items: pricingItems.filter((item) => item.category === category),
  }))
  .filter((group) => group.items.length > 0);

function formatCurrency(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ReservationPage() {
  return (
    <ThemeProvider theme={reddTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: 12, md: 14 },
          pb: 6,
          overflowX: "hidden",
          background:
            "radial-gradient(1200px 480px at 15% -10%, rgba(255,70,70,0.2), transparent 60%), radial-gradient(1000px 500px at 100% 5%, rgba(160,0,0,0.18), transparent 55%), #070707",
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1200, px: { xs: 1.25, sm: 2.5 } }}>
          <Card
            sx={{
              border: "1px solid rgba(255,255,255,0.14)",
              background:
                "linear-gradient(120deg, rgba(44,0,0,0.92) 0%, rgba(12,12,12,0.95) 48%, rgba(72,0,0,0.92) 100%)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                REDD Studio
              </Typography>
              <Typography
                variant="h1"
                sx={{ mt: 1, fontSize: { xs: 30, md: 56 }, lineHeight: 1.1 }}
              >
                Rezervasyon ve Fiyatlandirma
              </Typography>
              <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.8)", maxWidth: 780 }}>
                Bu sayfa fiyat referans ve bilgilendirme amacli kullanilir. Rezervasyon
                icin asagidaki WhatsApp numaralarindan dogrudan bize ulasabilirsin.
              </Typography>
            </CardContent>
          </Card>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 30 } }}>
                  1) Stüdyo Paketleri
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    gap: 1.5,
                  }}
                >
                  {studioPackages.map((item) => (
                    <Card key={item.id} variant="outlined" sx={{ bgcolor: "rgba(0,0,0,0.25)" }}>
                      <CardContent>
                        <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                        {item.note && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                            {item.note}
                          </Typography>
                        )}
                        <Typography color="primary.main" fontWeight={700} sx={{ mt: 0.8 }}>
                          {formatCurrency(item.price)}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Typography sx={{ mt: 1.1, fontSize: 13, color: "text.secondary" }}>
                  Bu fiyatlara KDV dahil degildir.
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 30 } }}>
                  2) Calisma Saatleri
                </Typography>
                <Stack spacing={0.9} sx={{ mt: 1.5 }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.92)" }}>
                    Tam Gun: 10:00 - 20:00
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.92)" }}>
                    Yarım Gun: 09:00 - 14:00 / 15:00 - 20:00
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.92)" }}>
                    Saatlik: 1800 TL (Min. 2 Saat)
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 30 }, mb: 1 }}>
                  3) Kiralık Ek Ekipmanlar
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.2 }}>
                  Bu alan sadece referans listesidir.
                </Typography>

                {rentalEquipmentGroups.map((group) => (
                  <Accordion key={group.category} defaultExpanded={group.category === "lighting"}>
                    <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                      <Typography
                        fontWeight={700}
                        color="primary.main"
                        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                      >
                        {categoryLabels[group.category]}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0.5 }}>
                      <Stack spacing={0.8}>
                        {group.items.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 2,
                              fontSize: 14,
                              px: 1,
                              py: 0.4,
                              borderRadius: 1,
                              minWidth: 0,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ minWidth: 0, pr: 1, wordBreak: "break-word" }}
                            >
                              {item.title}
                              {item.note ? ` (${item.note})` : ""}
                            </Typography>
                            <Typography variant="body2" fontWeight={700} sx={{ flexShrink: 0 }}>
                              {formatCurrency(item.price)}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}

                {includedItems.length > 0 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography fontWeight={700} mb={0.5}>
                      Kiralamaya Dahil
                    </Typography>
                    <Stack component="ul" sx={{ pl: 2, m: 0 }}>
                      {includedItems.map((item) => (
                        <Typography component="li" key={item.id} variant="body2">
                          <Box component="span" sx={{ wordBreak: "break-word" }}>
                            {item.title}
                          </Box>
                          {item.note ? ` - ${item.note}` : ""}
                        </Typography>
                      ))}
                    </Stack>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 30 } }}>
                  4) Iletisim ve Rezervasyon
                </Typography>
                <Typography sx={{ mt: 0.8, color: "text.secondary" }}>
                  En hizli geri donus icin WhatsApp hatlarini kullanin.
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    p: { xs: 1.2, sm: 1.5 },
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.015)",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1.1,
                    }}
                  >
                    <Button
                      component="a"
                      href="https://wa.me/905348808211"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 700,
                        color: "#f4fff9",
                        bgcolor: "#168f47",
                        px: 2,
                        py: 1.1,
                        minHeight: 56,
                        borderRadius: 1.5,
                        boxShadow: "0 2px 8px rgba(22,143,71,0.2)",
                        "&:hover": {
                          bgcolor: "#137d3e",
                          boxShadow: "0 3px 10px rgba(22,143,71,0.24)",
                        },
                      }}
                    >
                      <WhatsApp sx={{ mr: 1, fontSize: 20 }} />
                      <Stack spacing={0.1} alignItems="flex-start">
                        <Typography sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: 15 }}>
                          WhatsApp Hatti 1
                        </Typography>
                        <Typography sx={{ fontSize: 13, lineHeight: 1.2, opacity: 0.95 }}>
                          +90 534 880 82 11
                        </Typography>
                      </Stack>
                    </Button>
                    <Button
                      component="a"
                      href="https://wa.me/905419735370"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 700,
                        color: "#f4fff9",
                        bgcolor: "#168f47",
                        px: 2,
                        py: 1.1,
                        minHeight: 56,
                        borderRadius: 1.5,
                        boxShadow: "0 2px 8px rgba(22,143,71,0.2)",
                        "&:hover": {
                          bgcolor: "#137d3e",
                          boxShadow: "0 3px 10px rgba(22,143,71,0.24)",
                        },
                      }}
                    >
                      <WhatsApp sx={{ mr: 1, fontSize: 20 }} />
                      <Stack spacing={0.1} alignItems="flex-start">
                        <Typography sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: 15 }}>
                          WhatsApp Hatti 2
                        </Typography>
                        <Typography sx={{ fontSize: 13, lineHeight: 1.2, opacity: 0.95 }}>
                          +90 541 973 53 70
                        </Typography>
                      </Stack>
                    </Button>
                  </Box>
                  <Typography sx={{ mt: 1.1, color: "text.secondary", fontSize: 12.5, textAlign: "center" }}>
                    Ortalama geri donus: Gun icinde
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 1.4,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 1,
                  }}
                >
                  <Button
                    component="a"
                    href="mailto:info@4redd.com"
                    variant="outlined"
                    startIcon={<EmailRounded />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      minHeight: 44,
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "rgba(246,247,251,0.94)",
                      justifyContent: "flex-start",
                      "&:hover": { borderColor: "rgba(255,255,255,0.5)" },
                    }}
                  >
                    E-posta: info@4redd.com
                  </Button>
                  <Button
                    component="a"
                    href="https://www.instagram.com/for4redd?igsh=NWYzbHZteWY3cTR6"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<Instagram />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      minHeight: 44,
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "rgba(246,247,251,0.94)",
                      justifyContent: "flex-start",
                      "&:hover": { borderColor: "rgba(255,255,255,0.5)" },
                    }}
                  >
                    Instagram: @for4redd
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

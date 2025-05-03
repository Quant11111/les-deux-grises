import { NextRequest, NextResponse } from "next/server";
import probe from "probe-image-size";

/**
 * API route pour récupérer les dimensions d'une image
 * depuis une URL CloudFront/S3 sans télécharger l'image entière.
 *
 * GET /api/image-dimensions?url=https://dsq73kname7kn.cloudfront.net/path/to/image.jpg
 */
export async function GET(request: NextRequest) {
  // Extraire l'URL de l'image depuis les paramètres de la requête
  const url = request.nextUrl.searchParams.get("url");

  // Vérifier que l'URL est fournie
  if (!url) {
    return NextResponse.json(
      { error: "URL de l'image manquante" },
      { status: 400 }
    );
  }

  // Vérifier que l'URL est bien une URL CloudFront (pour la sécurité)
  if (!url.includes("dsq73kname7kn.cloudfront.net")) {
    return NextResponse.json(
      {
        error:
          "Domaine non autorisé. Seules les images de dsq73kname7kn.cloudfront.net sont acceptées.",
      },
      { status: 403 }
    );
  }

  try {
    /**
     * Méthode 1: Utiliser probe-image-size pour récupérer les dimensions
     * Cette méthode télécharge juste assez d'octets pour déterminer les dimensions
     * mais pas l'image entière
     */
    const result = await probe(url);

    return NextResponse.json({
      width: result.width,
      height: result.height,
      type: result.type, // format de l'image (jpg, png, etc.)
      mime: result.mime, // type MIME
    });

    /**
     * Méthode 2: Utiliser une requête HEAD (moins fiable pour les dimensions)
     * Cette méthode est utile pour obtenir la taille du fichier, mais pas les dimensions
     *
     * Vous pourriez l'implémenter comme ceci:
     */
    /*
    const response = await fetch(url, { method: 'HEAD' });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Récupérer la taille du fichier depuis les headers
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    // Note: cette approche ne donne pas les dimensions, seulement la taille du fichier
    return NextResponse.json({
      size: contentLength ? parseInt(contentLength, 10) : null,
      contentType
    });
    */
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des dimensions de l'image:",
      error
    );

    return NextResponse.json(
      { error: "Impossible de récupérer les dimensions de l'image" },
      { status: 500 }
    );
  }
}

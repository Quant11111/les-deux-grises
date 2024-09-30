"use server";

import { ActionError, authAction } from "@/lib/backend/safe-actions";
import { sendEmail } from "@/lib/mail/sendEmail";
import { prisma } from "@/lib/prisma";
import { SiteConfig } from "@/site-config";
import DeleteAccountEmail from "../../../../emails/DeleteAccountEmail";

export const deleteAccountAction = authAction.action(async ({ ctx }) => {
  const userId = ctx.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ActionError("You don't have an account!");
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  await sendEmail({
    from: SiteConfig.email.from,
    subject: "Your account has been deleted",
    to: user.email,
    react: DeleteAccountEmail({
      email: user.email,
    }),
  });
});

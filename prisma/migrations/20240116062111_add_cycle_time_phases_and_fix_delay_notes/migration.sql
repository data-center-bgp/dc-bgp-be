/*
  Warnings:

  - You are about to drop the column `arrivedAt_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `arrivedAt_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `arrivedInLoadingDock` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `arrivedInLoadingDock_2` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `assistConnectEntry` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `assistConnectEntry_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `assistConnectEntry_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `assistConnectExit` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `assistConnectExit_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `assistConnectExit_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `castOff` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `castOff_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `castOff_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `docking` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `docking_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `docking_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `documentCargoOnboard_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishAnchorUp` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishAnchorUp_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishDischarge_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishLoading` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishLoading_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishSounding` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `finishSounding_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `fullAway_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `fullAway_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `loadingMasterOnboard` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `loadingMasterOnboard_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `loadingMasterOnboard_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `ob_spob` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `orderAssistTugboatEntry` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `orderAssistTugboatEntry_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `orderAssistTugboatEntry_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `orderAssistTugboatExit` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `orderAssistTugboatExit_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `orderAssistTugboatExit_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startAnchorUp` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startAnchorUp_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startDischarge_discharge` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startLoading` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startLoading_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startSounding` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `startSounding_STS` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - You are about to drop the column `tugboat_spob` on the `CycleTimeCOA` table. All the data in the column will be lost.
  - Added the required column `arrivedAtJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrivedAtSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistConnectEntryJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistConnectEntryJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistConnectEntrySTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistConnectExitJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistConnectExitJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistConnectExitSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berthingJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berthingJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berthingSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `castOffJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `castOffJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `castOffSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentCargoOnboardJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishAnchorUpJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishAnchorUpJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishDischargeJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishInJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishLoadingJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishLoadingSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishSoundingJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishSoundingSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullAwayJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullAwaySTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingMasterOnboardJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingMasterOnboardJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingMasterOnboardSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obOrSpob` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAssistTugboatEntryJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAssistTugboatEntryJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAssistTugboatEntrySTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAssistTugboatExitJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAssistTugboatExitJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderAssistTugboatExitSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAnchorUpJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAnchorUpJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDischargeJettyDischarge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startFromJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLoadingJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLoadingSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startSoundingJettyLoading` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startSoundingSTS` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tugboatOrSpob` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity` to the `DelayNotesCOA` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `DelayNotesCOA` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CycleTimeCOA" DROP COLUMN "arrivedAt_STS",
DROP COLUMN "arrivedAt_discharge",
DROP COLUMN "arrivedInLoadingDock",
DROP COLUMN "arrivedInLoadingDock_2",
DROP COLUMN "assistConnectEntry",
DROP COLUMN "assistConnectEntry_STS",
DROP COLUMN "assistConnectEntry_discharge",
DROP COLUMN "assistConnectExit",
DROP COLUMN "assistConnectExit_STS",
DROP COLUMN "assistConnectExit_discharge",
DROP COLUMN "castOff",
DROP COLUMN "castOff_STS",
DROP COLUMN "castOff_discharge",
DROP COLUMN "docking",
DROP COLUMN "docking_STS",
DROP COLUMN "docking_discharge",
DROP COLUMN "documentCargoOnboard_discharge",
DROP COLUMN "finishAnchorUp",
DROP COLUMN "finishAnchorUp_discharge",
DROP COLUMN "finishDischarge_discharge",
DROP COLUMN "finishLoading",
DROP COLUMN "finishLoading_STS",
DROP COLUMN "finishSounding",
DROP COLUMN "finishSounding_STS",
DROP COLUMN "fullAway_STS",
DROP COLUMN "fullAway_discharge",
DROP COLUMN "loadingMasterOnboard",
DROP COLUMN "loadingMasterOnboard_STS",
DROP COLUMN "loadingMasterOnboard_discharge",
DROP COLUMN "ob_spob",
DROP COLUMN "orderAssistTugboatEntry",
DROP COLUMN "orderAssistTugboatEntry_STS",
DROP COLUMN "orderAssistTugboatEntry_discharge",
DROP COLUMN "orderAssistTugboatExit",
DROP COLUMN "orderAssistTugboatExit_STS",
DROP COLUMN "orderAssistTugboatExit_discharge",
DROP COLUMN "startAnchorUp",
DROP COLUMN "startAnchorUp_discharge",
DROP COLUMN "startDischarge_discharge",
DROP COLUMN "startLoading",
DROP COLUMN "startLoading_STS",
DROP COLUMN "startSounding",
DROP COLUMN "startSounding_STS",
DROP COLUMN "tugboat_spob",
ADD COLUMN     "arrivedAtJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "arrivedAtSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assistConnectEntryJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assistConnectEntryJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assistConnectEntrySTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assistConnectExitJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assistConnectExitJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "assistConnectExitSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "berthingJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "berthingJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "berthingSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "castOffJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "castOffJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "castOffSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "distance" INTEGER NOT NULL,
ADD COLUMN     "documentCargoOnboardJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishAnchorUpJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishAnchorUpJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishDischargeJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishInJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishLoadingJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishLoadingSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishSoundingJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finishSoundingSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fullAwayJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fullAwaySTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "loadingMasterOnboardJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "loadingMasterOnboardJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "loadingMasterOnboardSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "obOrSpob" TEXT NOT NULL,
ADD COLUMN     "orderAssistTugboatEntryJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderAssistTugboatEntryJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderAssistTugboatEntrySTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderAssistTugboatExitJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderAssistTugboatExitJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderAssistTugboatExitSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAnchorUpJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAnchorUpJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDischargeJettyDischarge" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startFromJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startLoadingJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startLoadingSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startSoundingJettyLoading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startSoundingSTS" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tugboatOrSpob" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DelayNotesCOA" ADD COLUMN     "activity" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Type";

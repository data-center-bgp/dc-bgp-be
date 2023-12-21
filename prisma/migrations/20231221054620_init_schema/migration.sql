-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MASTER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Internal', 'External');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CycleTimeCOA" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "trip" INTEGER NOT NULL,
    "fleet" TEXT NOT NULL,
    "tugboat_spob" TEXT NOT NULL,
    "ob_spob" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "estimatedFuel" INTEGER NOT NULL,
    "actualFuel" INTEGER NOT NULL,
    "arrivedInLoadingDock" TIMESTAMP(3) NOT NULL,
    "orderAssistTugboatEntry" TIMESTAMP(3) NOT NULL,
    "startAnchorUp" TIMESTAMP(3) NOT NULL,
    "finishAnchorUp" TIMESTAMP(3) NOT NULL,
    "assistConnectEntry" TIMESTAMP(3) NOT NULL,
    "docking" TIMESTAMP(3) NOT NULL,
    "loadingMasterOnboard" TIMESTAMP(3) NOT NULL,
    "startLoading" TIMESTAMP(3) NOT NULL,
    "finishLoading" TIMESTAMP(3) NOT NULL,
    "startSounding" TIMESTAMP(3) NOT NULL,
    "finishSounding" TIMESTAMP(3) NOT NULL,
    "orderAssistTugboatExit" TIMESTAMP(3) NOT NULL,
    "assistConnectExit" TIMESTAMP(3) NOT NULL,
    "castOff" TIMESTAMP(3) NOT NULL,
    "fullAway_STS" TIMESTAMP(3) NOT NULL,
    "arrivedAt_STS" TIMESTAMP(3) NOT NULL,
    "orderAssistTugboatEntry_STS" TIMESTAMP(3) NOT NULL,
    "assistConnectEntry_STS" TIMESTAMP(3) NOT NULL,
    "docking_STS" TIMESTAMP(3) NOT NULL,
    "loadingMasterOnboard_STS" TIMESTAMP(3) NOT NULL,
    "startLoading_STS" TIMESTAMP(3) NOT NULL,
    "finishLoading_STS" TIMESTAMP(3) NOT NULL,
    "startSounding_STS" TIMESTAMP(3) NOT NULL,
    "finishSounding_STS" TIMESTAMP(3) NOT NULL,
    "orderAssistTugboatExit_STS" TIMESTAMP(3) NOT NULL,
    "assistConnectExit_STS" TIMESTAMP(3) NOT NULL,
    "castOff_STS" TIMESTAMP(3) NOT NULL,
    "fullAway_discharge" TIMESTAMP(3) NOT NULL,
    "arrivedAt_discharge" TIMESTAMP(3) NOT NULL,
    "orderAssistTugboatEntry_discharge" TIMESTAMP(3) NOT NULL,
    "startAnchorUp_discharge" TIMESTAMP(3) NOT NULL,
    "finishAnchorUp_discharge" TIMESTAMP(3) NOT NULL,
    "assistConnectEntry_discharge" TIMESTAMP(3) NOT NULL,
    "docking_discharge" TIMESTAMP(3) NOT NULL,
    "loadingMasterOnboard_discharge" TIMESTAMP(3) NOT NULL,
    "startDischarge_discharge" TIMESTAMP(3) NOT NULL,
    "finishDischarge_discharge" TIMESTAMP(3) NOT NULL,
    "documentCargoOnboard_discharge" TIMESTAMP(3) NOT NULL,
    "orderAssistTugboatExit_discharge" TIMESTAMP(3) NOT NULL,
    "castOff_discharge" TIMESTAMP(3) NOT NULL,
    "arrivedInPulauAtas" TIMESTAMP(3) NOT NULL,
    "fullAwayAfterDischarge" TIMESTAMP(3) NOT NULL,
    "arrivedInLoadingDock_2" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CycleTimeCOA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DelayNotesCOA" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cycleTimeCOAId" TEXT,
    "route" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "DelayNotesCOA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CycleTimeCOA" ADD CONSTRAINT "CycleTimeCOA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DelayNotesCOA" ADD CONSTRAINT "DelayNotesCOA_cycleTimeCOAId_fkey" FOREIGN KEY ("cycleTimeCOAId") REFERENCES "CycleTimeCOA"("id") ON DELETE SET NULL ON UPDATE CASCADE;

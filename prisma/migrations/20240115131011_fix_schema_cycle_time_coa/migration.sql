/*
  Warnings:

  - Added the required column `assistConnectExit_discharge` to the `CycleTimeCOA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CycleTimeCOA" ADD COLUMN     "assistConnectExit_discharge" TIMESTAMP(3) NOT NULL;

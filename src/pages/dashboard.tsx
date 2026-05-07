import { useGlo } from "@/lib/GloContext";
import { Bell, User, Check, X, Plus, Target, Flame, Trophy, Calendar as CalendarIcon, Heart, Sparkles, Gift, Trash2 } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckInModal } from "@/components/CheckInModal";

export default function Dashboard() {
  const { goals, checkIns, checkInGoal, rewards, useReward, addReward, deleteReward, addGoal, visionBoard, stats } = useGlo();

  const today = new Date();

  const successRate = stats.successRate;
  const overallTotalCheckins = stats.totalCheckins;
  const currentMaxStreak = stats.currentStreak;
  const longestStreak = stats.longestStreak;

  // Form states
  const [newRewardTitle, setNewRewardTitle] = useState("");
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDesc, setNewGoalDesc] = useState("");
  const [newGoalFreq, setNewGoalFreq] = useState("Daily");
  const [newGoalReward, setNewGoalReward] = useState("none");
  
  // Modal state
  const [checkInModal, setCheckInModal] = useState<{ goalId: string; goalTitle: string } | null>(null);

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRewardTitle.trim()) {
      addReward(newRewardTitle);
      setNewRewardTitle("");
    }
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalTitle.trim()) {
      addGoal({
        title: newGoalTitle,
        description: newGoalDesc,
        frequency: newGoalFreq as 'Daily' | 'Weekly' | 'Custom',
        status: 'Active',
        rewardId: newGoalReward !== 'none' ? newGoalReward : undefined
      });
      setNewGoalTitle("");
      setNewGoalDesc("");
      setNewGoalFreq("Daily");
      setNewGoalReward("none");
    }
  };

  const handleCheckIn = (date: Date, status: "Done" | "Fail") => {
    if (checkInModal) {
      checkInGoal(checkInModal.goalId, date, status);
      setCheckInModal(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header / Hero Banner */}
      <div className="relative rounded-[2rem] overflow-hidden h-48 md:h-64 shadow-lg group">
        <div className="absolute inset-0">
          <img src="/hero.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Dreamy sky" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay"></div>
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start w-full">
            <div />
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border-2 border-white/50 overflow-hidden flex items-center justify-center">
                 <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="text-center w-full mb-4">
            <h2 className="text-3xl md:text-5xl font-serif text-white drop-shadow-md italic">
              "Discipline today, freedom tomorrow."
            </h2>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <path strokeDasharray={`${successRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
            </svg>
            <span className="absolute text-lg font-serif">{successRate}%</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Success Rate</p>
            <p className="text-xs text-primary font-serif italic mt-1">Great job!</p>
          </div>
        </Card>

        <Card className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-secondary-foreground">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Check-ins</p>
            <p className="text-2xl font-serif mt-1">{overallTotalCheckins}</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
        </Card>

        <Card className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-orange-100/50 flex items-center justify-center text-orange-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Current Streak</p>
            <p className="text-2xl font-serif mt-1">{currentMaxStreak} days</p>
          </div>
        </Card>

        <Card className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-yellow-100/50 flex items-center justify-center text-yellow-500">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Longest Streak</p>
            <p className="text-2xl font-serif mt-1">{longestStreak} days</p>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Today's Focus */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-serif text-foreground">Today's Focus</h3>
            <Button variant="outline" size="sm" className="rounded-xl border-primary/20 hover:bg-primary/10 text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" /> New Goal
            </Button>
          </div>
          
          <Card className="glass-card p-2 md:p-4 rounded-3xl">
            <div className="space-y-2">
              <AnimatePresence>
                {goals.map(goal => {
                  const checkIn = checkIns.find(c => c.goalId === goal.id && isSameDay(new Date(c.date), today));
                  const isDone = checkIn?.status === 'Done';
                  const isFail = checkIn?.status === 'Fail';

                  return (
                    <motion.div 
                      key={goal.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-4 rounded-2xl flex items-center justify-between transition-all duration-300",
                        isDone ? "bg-primary/10 border border-primary/20" :
                        isFail ? "bg-destructive/10 border border-destructive/20" :
                        "bg-white/50 hover:bg-white/80 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                          {isDone ? <Sparkles className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className={cn("font-medium text-lg", isDone && "line-through text-muted-foreground")}>
                            {goal.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                          {goal.rewardId && (
                            <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-secondary/30 text-xs text-secondary-foreground">
                              <Gift className="w-3 h-3" /> Reward attached
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!isDone && !isFail && (
                          <>
                            <button onClick={() => checkInGoal(goal.id, today, 'Done')} className="w-10 h-10 rounded-full bg-green-100/50 hover:bg-green-200 flex items-center justify-center text-green-600 transition-colors">
                              <Check className="w-5 h-5" />
                            </button>
                            <button onClick={() => checkInGoal(goal.id, today, 'Fail')} className="w-10 h-10 rounded-full bg-red-100/50 hover:bg-red-200 flex items-center justify-center text-red-600 transition-colors">
                              <X className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => setCheckInModal({ goalId: goal.id, goalTitle: goal.title })}
                              className="w-10 h-10 rounded-full bg-blue-100/50 hover:bg-blue-200 flex items-center justify-center text-blue-600 transition-colors"
                              title="Log for a different day"
                            >
                              <CalendarIcon className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {isDone && <span className="text-sm font-medium text-green-600 bg-green-100/50 px-3 py-1 rounded-full">Completed!</span>}
                        {isFail && <span className="text-sm font-medium text-red-500 bg-red-100/50 px-3 py-1 rounded-full">Skipped</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50 flex flex-col items-center justify-center text-muted-foreground">
              <Heart className="w-5 h-5 text-secondary-foreground mb-2" />
              <p className="text-sm font-serif italic">Every small step matters.</p>
            </div>
          </Card>
        </div>

        {/* Check-in Calendar */}
        <div className="space-y-4">
          <div className="px-2">
            <h3 className="text-2xl font-serif text-foreground">Check-in Calendar</h3>
          </div>
          <Card className="glass-card p-6 rounded-3xl flex flex-col items-center">
             <Calendar
              mode="single"
              selected={today}
              className="bg-transparent"
              modifiers={{
                done: (date) => checkIns.some(c => isSameDay(new Date(c.date), date) && c.status === 'Done'),
                fail: (date) => checkIns.some(c => isSameDay(new Date(c.date), date) && c.status === 'Fail')
              }}
              modifiersStyles={{
                done: { backgroundColor: 'hsl(142 71% 85%)', color: 'hsl(142 76% 25%)', borderRadius: '50%' },
                fail: { backgroundColor: 'hsl(350 70% 85%)', color: 'hsl(350 70% 30%)', borderRadius: '50%' }
              }}
            />
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground w-full justify-center">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-200"></div> Done</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-200"></div> Missed</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-black/5"></div> No entry</div>
            </div>
          </Card>
        </div>

      </div>

      {/* Forms & Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-foreground px-2">Add New Goal</h3>
          <Card className="glass-card p-6 rounded-3xl">
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" value={newGoalTitle} onChange={e => setNewGoalTitle(e.target.value)} placeholder="e.g. Read 20 pages" className="bg-white/50 border-white/50 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" value={newGoalDesc} onChange={e => setNewGoalDesc(e.target.value)} placeholder="A little more detail..." className="bg-white/50 border-white/50 rounded-xl resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select value={newGoalFreq} onValueChange={setNewGoalFreq}>
                    <SelectTrigger className="bg-white/50 border-white/50 rounded-xl">
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Attach Reward (Optional)</Label>
                  <Select value={newGoalReward} onValueChange={setNewGoalReward}>
                    <SelectTrigger className="bg-white/50 border-white/50 rounded-xl">
                      <SelectValue placeholder="Select reward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {rewards.filter(r => !r.isUsed).map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                Add Goal
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-foreground px-2">All Goals</h3>
          <Card className="glass-card p-6 rounded-3xl h-[392px] flex flex-col">
            <Tabs defaultValue="all" className="w-full flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4 rounded-xl bg-white/40 mb-4 p-1">
                <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
                <TabsTrigger value="active" className="rounded-lg">Active</TabsTrigger>
                <TabsTrigger value="completed" className="rounded-lg">Done</TabsTrigger>
                <TabsTrigger value="archived" className="rounded-lg">Archive</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                <TabsContent value="all" className="mt-0 space-y-3">
                  {goals.map(g => (
                    <div key={g.id} className="p-3 bg-white/60 rounded-2xl flex items-center justify-between border border-white/40">
                      <div>
                        <h4 className="font-medium text-sm">{g.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Flame className="w-3 h-3 text-orange-400" /> {g.streak} day streak
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-md">{g.status}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="active" className="mt-0 space-y-3">
                  {goals.filter(g => g.status === 'Active').map(g => (
                    <div key={g.id} className="p-3 bg-white/60 rounded-2xl flex items-center justify-between border border-white/40">
                      <div>
                        <h4 className="font-medium text-sm">{g.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Flame className="w-3 h-3 text-orange-400" /> {g.streak} day streak
                        </p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                {/* Simplified contents for other tabs */}
                <TabsContent value="completed" className="mt-0">
                  <div className="text-center text-sm text-muted-foreground py-8">No completed goals yet.</div>
                </TabsContent>
                <TabsContent value="archived" className="mt-0">
                  <div className="text-center text-sm text-muted-foreground py-8">No archived goals.</div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Available Rewards */}
        <div className="space-y-4 flex flex-col">
          <h3 className="text-2xl font-serif text-foreground px-2">Available Rewards</h3>
          <Card className="glass-card p-4 rounded-3xl h-[320px] flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4">
              {rewards.filter(r => !r.isUsed).map(reward => (
                <div key={reward.id} className="p-3 rounded-2xl bg-white/60 flex items-center justify-between border border-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-secondary-foreground">
                      <Gift className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{reward.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="rounded-xl text-xs h-8 hover:bg-secondary/40 text-secondary-foreground" onClick={() => useReward(reward.id)}>
                      Use
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 hover:bg-destructive/10 text-destructive/70" onClick={() => deleteReward(reward.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {rewards.filter(r => !r.isUsed).length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8 font-serif italic">
                  No rewards available. Time to earn some!
                </div>
              )}
            </div>

            <form onSubmit={handleAddReward} className="mt-auto pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2 px-1">Add a new reward to motivate yourself</p>
              <div className="flex gap-2">
                <Input value={newRewardTitle} onChange={e => setNewRewardTitle(e.target.value)} placeholder="Reward idea..." className="bg-white/50 border-white/50 rounded-xl" />
                <Button type="submit" size="icon" className="rounded-xl shrink-0"><Plus className="w-4 h-4" /></Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Vision Board Grid */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-serif text-foreground">Vision Board</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground rounded-xl hover:bg-black/5">Edit</Button>
          </div>
          <Card className="glass-card p-4 rounded-3xl h-[320px]">
            <div className="grid grid-cols-4 gap-3 h-full">
              {visionBoard.slice(0,8).map((item, i) => (
                <div key={item.id} className={cn(
                  "relative rounded-2xl overflow-hidden shadow-sm group bg-white/20",
                  item.text ? "col-span-2 row-span-2 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center p-4 text-center border-2 border-white/50" : ""
                )}>
                  {item.src ? (
                    <img src={item.src} alt="Vision" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <h4 className="font-serif text-2xl italic text-foreground leading-snug drop-shadow-sm">"{item.text}"</h4>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Check-in Modal */}
      {checkInModal && (
        <CheckInModal
          goalTitle={checkInModal.goalTitle}
          onCheckIn={handleCheckIn}
          onClose={() => setCheckInModal(null)}
        />
      )}

      <div className="text-center py-12 pb-8">
        <p className="font-serif text-xl text-muted-foreground italic">"You are becoming everything you dreamed of. Keep going."</p>
      </div>
      
    </div>
  );
}

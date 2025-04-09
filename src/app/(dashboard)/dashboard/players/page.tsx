"use client";

import { useState, useEffect, FormEventHandler } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rating from "../../../mycomponents/stars";

const SERVER_URL = "http://localhost:3131";

export default function PlayersManagement() {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    phone: "",
    email: "",
    isGoalKeeper: false,
    skill: 3,
    stamina: 3,
    shirt: 1,
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchPlayers() {
      const res = await fetch(`${SERVER_URL}/players`);
      const data = await res.json();
      setPlayers(data.players || []);
    }
    fetchPlayers();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "wins" || name === "shirt" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `${SERVER_URL}/players/${formData.id}`
      : `${SERVER_URL}/players/create`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setIsDialogOpen(false);
    setIsEditing(false);
    fetchPlayers();
  };

  const handleEdit = (player: any) => {
    setFormData(player);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${SERVER_URL}/players/${id}`, {
      method: "DELETE",
    });
    fetchPlayers();
  };

  async function fetchPlayers() {
    const res = await fetch(`${SERVER_URL}/players`);
    const data = await res.json();
    console.log(data.players);
    setPlayers(data.players || []);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gerenciar Jogadores</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  id: formData.id,
                  name: formData.name,
                  phone: formData.phone,
                  isGoalKeeper: formData.isGoalKeeper,
                  skill: formData.skill,
                  shirt: formData.shirt,
                  stamina: formData.shirt,
                  image: formData.image,
                  email: formData.email,
                });
                setIsDialogOpen(true);
              }}>
              Adicionar Jogador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              {isEditing ? "Editar Jogador" : "Adicionar Jogador"}
            </DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label>Nome</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Label>Telefone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Label>Email</Label>
              <Input
                name="email"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <Label>Nível</Label>
              <select
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                required>
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <Label>Resistência</Label>
              <select
                name="stamina"
                value={formData.stamina}
                onChange={handleChange}
                required>
                {[1, 2, 3, 4, 5].map((stamina) => (
                  <option key={stamina} value={stamina}>
                    {stamina}
                  </option>
                ))}
              </select>

              <Label>Número da Camisa</Label>
              <Input
                name="shirtNumber"
                type="number"
                value={formData.shirt}
                onChange={handleChange}
                required
              />
              <Label>Imagem</Label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
              <Button type="submit">
                {isEditing ? "Atualizar" : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Resistência</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player: any) => (
            <TableRow key={player.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={player.image} />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{player.shirt}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>
                <Rating label="" value={player.skill} />
              </TableCell>
              <TableCell>
                <Rating label="" value={player.stamina} />
              </TableCell>
              <TableCell>{player.phone}</TableCell>
              <TableCell>{player.email}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEdit(player)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(player.id)}>
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
